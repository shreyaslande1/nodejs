const path = require("path");
const express = require("express");
const multer = require("multer")
const { connectToMongodb } = require("./connection")
const Image = require("./models/image");
const app = express();
const PORT = 8000;
connectToMongodb("mongodb://127.0.0.1:27017/imageupload")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB error:", err));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const upload = multer({storage});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(express.static("uploads"));


app.get("/", async (req, res)=>{

    const images = await Image.find({});
    console.log(images[0].path);
    
    return res.render("homepage", {
        images
    });
});

app.post("/upload", upload.single("profileimage"), async (req, res)=>{

    await Image.create({
        filename: req.file.originalname,
        path: req.file.filename,
    });

    return res.redirect("/");
});


app.listen(PORT, ()=> console.log(`server started at the PORT:${PORT} `))