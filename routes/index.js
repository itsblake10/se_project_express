const express = require("express");

const { NotFoundError } = require("../utils/errors/not-found-error");

const router = express.Router();

const users = require("./users");

const clothingItems = require("./clothingItems");

const likes = require("./likes");

router.use("/", users);

router.use("/", clothingItems);

router.use("/", likes);

// Handle non-existent resource
router.use((req, res, next) =>
  next(new NotFoundError("Requested resource not found")),
);

module.exports = router;
