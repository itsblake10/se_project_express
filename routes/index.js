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
  res.status(404).json({ message: "Requested resource not found" });
});

module.exports = router;
