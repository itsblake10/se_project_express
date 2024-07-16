// NEW
// middlewares/error-handler.js
// const BadRequestError = require("../utils/errors/bad-request-error");
// const UnauthorizedError = require("../utils/errors/unauthorized-error");
// const ForbiddenError = require("../utils/errors/forbidden-error");
// const NotFoundError = require("../utils/errors/not-found-error");
// const ConflictError = require("../utils/errors/conflict-error");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ error: message });
};

module.exports = {
  errorHandler,
};
