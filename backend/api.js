const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const User = require("./models/Users");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.static(path.join(__dirname, "frontend"))); // Optional I think
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// MongoDB Connection
console.log("Attempting to connect to MongoDB");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

// Routes

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "frontend", "src", "Register.js"));
});
// Renders html/js file in frontend

app.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    const result = await newUser.save();
    console.log("User saved:", result);
    res.redirect("/register");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Something went wrong");
  }
});

//Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({
    title: "Error Page",
    message: err.message,
    error: err,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Rizz app listening on port ${port}`);
});
