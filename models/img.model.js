const mongoose = require("mongoose");

const imgSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

const Img = mongoose.model("Img", imgSchema);

module.exports = Img;
