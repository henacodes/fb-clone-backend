const express = require("express");
const router = express.Router();
const authenticate = require("./authentication");
const Img = require("../models/img.model");

router.get("/getAvatar", authenticate, async (req, res) => {
  try {
    const img = await Img.findOne({ name: "defaultAvatar" });
    return res.json(img);
  } catch (error) {
    return res.status(404).json(error);
  }
});

module.exports = router;
