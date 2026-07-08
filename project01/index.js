const express = require("express");
const { connectMongoDb } = require("./connection");
const logreqres = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// Connect MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logreqres("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Server is Running...");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});