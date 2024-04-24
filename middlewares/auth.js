const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_ERROR } = require("../utils/errors");

const authMiddleware = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: "Unauthorized: Missing or invalid token" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      console.error(err);
      return res
        .status(UNAUTHORIZED_ERROR)
        .send({ message: "Unauthorized: Invalid token" });
    }

    req.user = payload;

    next();
  });
};

module.exports = authMiddleware;
