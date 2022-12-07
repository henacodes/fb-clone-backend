const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  caption: {
    type: String,
  },
  img: {
    type: String,
  },
  date_posted: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: String,
    dafault: "",
  },
  comments: {
    type: String,
    dafault: "",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
