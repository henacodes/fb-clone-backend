const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  activated: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
  profilePic: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
  interestedIn: [
    {
      type: String,
    },
  ],
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
