const express = require("express");
const Tag = require("../models/Tag");
const router = express.Router();
const {verifyToken} = require("../middleware/auth-middleware");

router.get("/", verifyToken, async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    console.error("Error fetching tags:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
