const jwt = require("jsonwebtoken");
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({
      message:
        "Not authenticated, Authentication credintials were not provided",
    });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Authentication token is not valid" });
    req.payload = payload;
    next();
  });
}

module.exports = authenticate;
