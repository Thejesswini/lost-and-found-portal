const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    const token = req.header("Authorization");
    if (!token){
        console.log("check auth-middleware", token);
        return res.status(401).send({
            error:"Access denied",
        });
    }

    try {
        const decode = jwt.verify(token, "secret");
        req.user = decode;
        next();
    } catch(err) {
        return res.status(401).send({
            error:"Token is invalid",
        });
    }
}

module.exports = {verifyToken};