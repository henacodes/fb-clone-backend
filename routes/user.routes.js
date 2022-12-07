require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("./authentication");
router.get("/", async (req, res) => {
  const user = await User.find({});
  return res.json(user);
});

/* router.get("/:id", authenticate, async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user == "") {
    return res.json({ message: "User doesn't exist" });
  }
  return res.json(user);
});
 */
router.post("/create", async (req, res) => {
  const { username, email, password } = req.body;
  let exists = await User.findOne({ username: username });
  if (exists) {
    return res.status(400).json({ message: " User already exists " });
  }
  if (username === "" || password === "") {
    return res.status(400).json({ message: " Please fill all fields " });
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashed_password = await bcrypt.hash(password, salt);
  const user = new User({
    username: username,
    email: email ? email : "",
    password: hashed_password,
    salt,
  });
  try {
    await user.save();
    console.log("user saved successfulyy");
    const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET);
    return res.status(201).json({ username, email, token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  if (username == "" || password == "") {
    return res.status(400).json({ message: " Please fill all fields " });
  }
  let exists = await User.findOne({ username: username });
  if (exists) {
    const valid = await bcrypt.compare(password, exists.password);
    if (valid) {
      const payload = {
        username: exists.username,
      };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findOne({ username: username })
        .select("-password")
        .select("-salt");
      res.json({ token: accessToken, user: user });
    } else {
      return res.status(401).json({ message: " The passsword is invalid " });
    }
  } else {
    return res
      .status(404)
      .json({ message: "User doesn't exist with the provided username" });
  }
});

router.post("/edit", authenticate, async (req, res) => {
  const username = req.payload.username;

  try {
  } catch (error) {}
});

router.get("/me", authenticate, async (req, res) => {
  const username = req.payload.username;
  try {
    const user = await User.findOne({ username: username })
      .select("-password")
      .select("-salt");
    return res.json(user);
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
