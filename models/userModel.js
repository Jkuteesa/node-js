const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const signupSchema = new mongoose.Schema({
   firstname: {
    type: String,
    trim: true,
    require: true,
   } ,
   lastname: {
    type: String,
    trim: true,
    require: true,
   } ,
   username: {
    type: String,
    require: true,
    trim: true,
   } ,
   emailname: {
    type: String,
    trim: true,
    require: true
   } ,
   rolename: {
    type: String,
    trim: true,
    require: true
   } ,
   branchname: {
    type: String,
    trim: true,
    require: true
   } ,
   password: {
    type: String,
    trim: true,
    require: true
   } ,

});

signupSchema.plugin(passportLocalMongoose, {usernameField:"email"}); //this is whhen you want to modify the username
module.exports = mongoose.model("Signup", signupSchema);