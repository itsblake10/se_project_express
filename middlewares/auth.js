const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

const { UNAUTHORIZED_ERROR } = require("../utils/errors");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: "Unauthorized: Missing or invalid token" });
  }

  const token = authorization.replace("Bearer ", "");
  console.log(token);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: "Authorization Required" });
  }

  req.user = payload;
  return next();
};

module.exports = authMiddleware;
