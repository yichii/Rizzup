const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

router.get("/", postController.getAllPosts);

router.get(
  "/topics/:topicName",
  auth.optionallyVerifyToken,
  postController.getPostsByTopic
);

router.get("/:id", auth.optionallyVerifyToken, postController.getPost);

router.get(
  "/users/:username",
  auth.optionallyVerifyToken,
  postController.getUserPosts
);

router.post("/", auth.verifyToken, postController.createPost);

router.post("/Like/:id", auth.verifyToken, postController.LikePost);

router.post("/unLike/:id", auth.verifyToken, postController.unLikePost);

router.delete("/:id", auth.verifyToken, postController.deletePost);

router.patch("/:id", auth.verifyToken, postController.updatePost);

module.exports = router;
