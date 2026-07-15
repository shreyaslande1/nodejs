require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const Blog = require("./models/blog");
const blogRouter = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const app = express();
const PORT = process.env.PORT || 8002;

mongoose.connect(process.env.MONGO_URL).then((e)=>{console.log("mongodb connected")});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))


app.use(express.json()); // For JSON requests
app.use(express.urlencoded({ extended: false })); // For HTML form data
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use(express.static(path.resolve('./public')));
app.use("/user", userRouter);
app.use("/blog", blogRouter);


app.get("/", async (req, res)=>{
    const allBlogs = await (await Blog.find({}));
    res.render("home",{
        user: req.user,
        blogs : allBlogs,
    })
})

app.listen(PORT, ()=> console.log(`server started on PORT:${PORT}`))