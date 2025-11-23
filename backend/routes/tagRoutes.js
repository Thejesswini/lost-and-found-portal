const express = require("express");
const Tag = require("../models/Tag");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    console.error("Error fetching tags:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
