const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    const token = req.header("Authorization");
    if (!token){
        return res.status(401).send({
            error:"Access denied",
        });
    }
    try {
        const decode = jwt.verify(token, "secret");
        next();
    } catch(err) {
        return res.status(401).send({
            error:"Token is invalid",
        });
    }
}

module.exports = {verifyToken};