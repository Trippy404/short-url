const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const {checkForAuthentication, restrictTo}=require('./middleware/auth')


const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);



app.use("/url",restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use('/', staticRoute)

// Route to handle redirection from short URL to long URL
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true } // Ensures we get the updated document
    );

    if (!entry) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error handling redirect:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
