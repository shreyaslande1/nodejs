const express = require("express");
const Router = express.Router();
const {handleUserSignup, handleUserLogin} = require("../controllers/user")
Router.post("/", handleUserSignup);
Router.post("/login", handleUserLogin);

module.exports = Router;