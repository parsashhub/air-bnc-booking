const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  const { token } = req.cookies;
  if (!token) return res.status(401).send({ message: "Access denied" });

  try {
    req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    next();
  } catch (e) {
    res.status(400).send("Invalid token");
  }
};
