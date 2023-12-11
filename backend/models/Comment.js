const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      maxLength: [5000, "Comment should not exceed 5000 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    repliedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    edited: Boolean,
  },
  { timestamps: true }
);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;