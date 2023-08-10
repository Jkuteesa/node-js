// this importing what we need
const express = require("express");
const Signup = require("../models/userModel");
const passport = require("passport");
const router = express.Router();

// const userModel = require("../models/userModel");

router.get("/signup", (req, res) => {
  res.render("user.pug");
});
// we are creating our first post
router.post("/register", async (req, res) => {
  try {
    const user = new Signup(req.body);
    console.log(req.body);
    await Signup.register(user, req.body.password);
    res.redirect("/api/signup")
  } catch (error) {
    res.status(400).send({ message: "failed to register user" });
    console.log(error);
  }
});

// routes for login
router.get("/login", (req, res) =>{
  res.render("login.pug");
});

router.post("/login", passport.authenticate("local",
{failureRedirect: "/api/login"}), 
(req, res)=> {
  req.session.user = req.user
 let loggedinUser = req.session.user.firstname;
 console.log(loggedinUser)
  res.redirect("/api/dashboard")
}
)



module.exports = router;
