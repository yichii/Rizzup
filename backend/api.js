const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./models/Users");
// const appRoutes = require("./app");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Port 3001

// Middleware
app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
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
// app.use("/", appRoutes);
app.get("/", function (req, res) {
  const filePath = path.join(__dirname, "../frontend/src/pages/Home.js");
  res.sendFile(filePath);
});

app.get("/login", function (req, res) {
  const filePath = path.join(__dirname, "../frontend/src/Login.js");
  res.sendFile(filePath);
});

app.get("/register", function (req, res) {
  const filePath = path.join(__dirname, "../frontend/src/Register.js");
  res.sendFile(filePath);
});

app.post("/register", async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res
        .status(400)
        .send("User already exists. Please choose a different name");
    }
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    // newUser.password = hashedPassword;
    const result = await newUser.save();
    console.log("User saved:", result);
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error saving user:", error);
    next(error);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const pass = await User.findOne({ password: req.body.password });
    if (!user || !pass) {
      return res.status(400).send("Username or password is incorrect");
    } else {
      res.redirect("/");
    }
    // const isPasswordMatch = await bcrypt.compare(
    //   req.body.password,
    //   user.password
    // );
    // if (isPasswordMatch) {
    //   return res.redirect("/");
    // }
    // } else {
    //   return res.status(400).send("Wrong password");
    // }
  } catch (error) {
    next(error);
  }
});

// Error handler
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
