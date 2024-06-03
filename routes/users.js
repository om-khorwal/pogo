var express = require('express');
var router = express.Router();
const plm = require("passport-local-mongoose");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;

const mongoose = require("mongoose"); 
mongoose.connect("mongodb://127.0.0.1:27017/demo");
const userschema = mongoose.Schema({
  username:String,
  name:String,
  age:Number
});
userschema.plugin(plm);
module.exports = mongoose.model("user",userschema);