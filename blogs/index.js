const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const app = express();
const PORT = 8002;

mongoose.connect('mongodb://127.0.0.1:27017/blogs').then((e)=>{console.log("mongodb connected")});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))


app.use(express.json()); // For JSON requests
app.use(express.urlencoded({ extended: false })); // For HTML form data
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"));
app.use("/user", userRouter);


app.get("/", (req, res)=>{
    res.render("home",{
        user: req.user
    })
})

app.listen(PORT, ()=> console.log(`server started on PORT:${PORT}`))