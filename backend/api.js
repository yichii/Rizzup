const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const User = require("./models/Users");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const jwt = require("jsonwebtoken");

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

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const tokenParts = authorizationHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

// Apply this middleware to protected routes
// app.use("/home", verifyToken);
// Add more routes that require authentication as needed.

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

// app.get("/posts", async (req, res, next) => {
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//   } catch (error) {
//     console.error("Error retrieving posts:", error);
//     next(error);
//   }
// });
// app.get("/:postId/comment", async (req, res, next) => {});

// app.get("/posts/:postId/comments", async (req, res, next) => {
//   try {
//     const postId = req.params.postId;
//     const comments = await Comment.find({ postId });
//     res.json(comments);
//   } catch (error) {
//     console.error("Error fetching comments:", error);
//     res.status(500).json({ message: "Error fetching comments" });
//   }
// });

app.get("/posts", async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    next(error);
  }
});

app.get("/home", function (req, res) {
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

// app.get("/posts/:userId", async (req, res, next) => {
//   try {
//     const userId = req.params.userId;

//     const posts = await Post.find({ user: userId });

//     res.json(posts);
//   } catch (error) {
//     console.error("Error retrieving posts:", error);
//     next(error);
//   }
// });

// app.post("/posts/:postId/comments", verifyToken, async (req, res, next) => {
//   try {
//     const postId = req.params.postId;
//     const commentText = req.body.comment;
//     const userId = req.user._id;

//     res.status(201).json({ message: "Comment created successfully" });
//   } catch (error) {
//     console.error("Error creating a comment:", error);
//     res.status(500).json({ message: "Error creating a comment" });
//   }
// });

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
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    }
  } catch (error) {
    next(error);
  }
});

app.post("/home", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const content = req.body.content;
    const comment = req.body.comment;
    console.log("Received POST request with content:", content);

    const newPost = new Post({
      content,
      author: userId,
    });

    const newComment = new Comment({
      comment,
      author: userId,
    });

    await newPost.save();

    User.findOneAndUpdate(
      { _id: userId },
      { $inc: { postCount: 1 } },
      { new: true }
    )
      .exec()
      .then((user) => {
        if (!user) {
          console.error("User not found");
          res.status(500).send("Error incrementing postCount");
        } else {
          console.log("Post added to user and postCount incremented");
          res.status(201).send("Post created and added to user successfully");
        }
      })
      .catch((err) => {
        console.error("Error incrementing postCount:", err);
        res.status(500).send("Error incrementing postCount");
      });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Error creating a post");
  }
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    title: "Error Page",
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Rizz app listening on port ${port}`);
});
