const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {

    let allurls;

    if (req.user.role === "ADMIN") {
        allurls = await URL.find({});
    } else {
        allurls = await URL.find({
            createdBy: req.user._id,
        });
    }

    res.render("home", {
        urls: allurls,
    });
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/login", (req, res) => {
    res.render("login");
});

module.exports = router;