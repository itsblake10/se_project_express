const { NOT_FOUND_ERROR } = require("../utils/errors");

const express = require("express");

const router = express.Router();

const users = require("./users");

const clothingItems = require("./clothingItems");

const likes = require("./likes");

router.use("/", users);

router.use("/", clothingItems);

router.use("/", likes);

// Handle non-existent resource
router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).json({ message: "Requested resource not found" });
});

module.exports = router;
