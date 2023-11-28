const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("PostLike", LikeSchema);
