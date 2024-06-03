const { render } = require('ejs');
var express = require('express');
var router = express.Router();
const usermodel = require("./users");
const passport = require('passport');
const localStrategy = require('passport-local');

passport.authenticate(new localStrategy(usermodel.authenticate));

router.get('/', (req, res) => {
  res.send("hello")
})
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})
router.get('/profile', isLoggedIn , (req, res) => {
  res.send("welcome to profile")
})

router.post('/register', (req, res) => {
  const { username, name, age } = req.body;
  const userData = new usermodel({ username, name, age });

  usermodel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile")
      })
    })
})

router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), (req, res) => { })

function isLoggedIn(req , res , next){
  if(req.isAuthenticated()) return next();
  res.redirect("/");
}
module.exports = router;
