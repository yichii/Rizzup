// Define User Schema and Model
var postSchema = require(__dirname + "/Post.js").schema;
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [6, "Must be at least 6 characters long"],
      maxLength: [30, "Must be no more than 30 characters long"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false,
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    postCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
