const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connection");
const cookieparser = require("cookie-parser");
const {checkForAuthentication, restrictTo} = require("./middleware/auth")
const app = express();
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const StaticRoutes = require("./routes/StaticRouter");
const userRoutes = require("./routes/user");
const { resourceLimits } = require("worker_threads");
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("mongodb connected successfully"),
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

app.use(checkForAuthentication);

app.use("/", StaticRoutes);
app.use("/user", userRoutes);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    {
      returnDocument: "after",
    },
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  res.redirect(entry.redirectedURL);
});

app.listen(PORT, () => {
  console.log("server started at port ", PORT);
});
