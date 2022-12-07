const express = require("express");
const router = express.Router();
const authenticate = require("./authentication");
const Post = require("../models/post.model");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author")
      .sort({ date_posted: -1 })
      .select("-password")
      .select("-salt");
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/create", authenticate, async (req, res) => {
  const { caption, img, author } = await req.body;
  console.log(caption + " is caption and here " + author);

  try {
    if ((caption == "" && img == "") || author == "") {
      return res.status(400).json({ message: "No content to post!!" });
    }
    const newPost = new Post({
      caption,
      img,
      author,
    });
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:id", authenticate, async (req, res) => {
  const user = req.payload.username;
  const id = await req.params.id;
  try {
    const post = await Post.findById(id);
    if (post.author.toString() !== user.toString()) {
      return res.json({ message: "You are not authored to delete the post" });
    }
    await post.delete();
    return res.json(post);
  } catch (error) {
    res.json({ message: "This post is unavailable" });
  }
});

module.exports = router;
