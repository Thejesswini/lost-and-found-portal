const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth-middleware");
const User = require("../db/user");
const {verifyToken} = require("../middleware/auth-middleware");

router.get("/me", verifyToken, async (req, res) => {
    console.log("gettin the user data");
    try {
        const user = await User.findById(req.user.id).select("name email");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
