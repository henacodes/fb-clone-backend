require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Img = require("./models/img.model");
const app = express();
const User = require("./models/user.model");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const utilsRoutes = require("./routes/utils.routes");
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/utils", utilsRoutes);
const port = process.env.port;
const mongoURI = process.env.MONGO_URI;
const conn = mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  () => console.log(`MongoDB connnected to ${mongoURI} database`),
  (err) => console.log(err)
);

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
