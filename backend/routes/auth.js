const express = require('express');
const { registerUser, loginUser } = require('../handlers/auth-handler');
const router = express.Router();
const User = require('../db/user');

router.get('/check-email', async (req, res) => {
  const { email } = req.query;
  const existing = await User.findOne({ email });
  res.json(!!existing);
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please provide name, email, and password!" });
    }

    try {
        const result = await registerUser({ name, email, password });
        if (!result) {
            return res.status(400).json({ error: "Error. Try again later" });
        }

        // Convert Mongoose doc to plain object and remove password
        const user = result.user.toObject();
        delete user.password;

        // Send token + user in clean JSON
        res.json({ token: result.token, user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


router.post("/login", async (req, res)=>{
    let model = req.body;
    if (model.email && model.password){
        const result = await loginUser(model);
        if (result){
            res.send(result);
        } else {
            res.status(400).json({
                error:"Email or password is incorrect!",
            });
        }
      
    } else {
        res.status(400).json({
            error:"Please provide email and password!",
        });
    }
});

module.exports = router;