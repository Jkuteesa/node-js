const { ensureLoggedIn } = require("connect-ensure-login");
const express = require("express");
const router = express.Router();


router.get("/dashboard", ensureLoggedIn("/api/login"), (req,res) =>{
    res.render("dashboard.pug")
});


module.exports=router 