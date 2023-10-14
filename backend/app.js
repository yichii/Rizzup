const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");

const User = require("./models/Users");

// router.get("/register", function (req, res) {
//   res.sendFile(path.join(__dirname, "frontend", "src", "pages", "Register.js"));
// });

// router.get("/login", function (req, res) {
//   res.sendFile(path.join(__dirname, "frontend", "src", "pages", "Login.js"));
// });

// router.get("/home", function (req, res) {
//   res.sendFile(path.join(__dirname, "frontend", "src", "pages", "Home.js"));
// });

router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    const existingUser = await User.findOne({
      username: req.body.username,
    });
    if (existingUser) {
      res.send("User already exists. Please choose a different name");
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
      newUser.password = hashedPassword;
      const result = await User.insertMany(newUser);
      console.log("User saved:", result);
    }
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Something went wrong");
  }
});

router.post("/login", async (req, res) => {
  try {
    const check = await User.findOne({ username: req.body.username });
    if (!check) {
      res.send("Username cannot be found");
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      alert("You have logged in!");
      res.redirect("/");
    } else {
      req.send("Wrong password");
    }
  } catch {
    res.send("Wrong details");
  }
});

module.exports = router;
