const express = require("express");

const router = express.Router();

const users = require("./users");

const clothingItems = require("./clothingItems");

router.use("/users", users);

router.use("/clothingItems", clothingItems);

// Handle non-existent resource
router.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

module.exports = router;
