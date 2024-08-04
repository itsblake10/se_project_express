// NEW
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

// const { UNAUTHORIZED_ERROR } = require("../utils/errors");
const UnauthorizedError = require("../utils/errors/unauthorized-error");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("Unauthorized: Missing or invalid token"));
  }

  const token = authorization.replace("Bearer ", "");
  console.log("Received token:", token);

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    next(new UnauthorizedError("Unauthorized: Missing or invalid token"));
  }
  req.user = payload;

  return next();
};

module.exports = authMiddleware;
