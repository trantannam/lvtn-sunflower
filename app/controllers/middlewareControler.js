const jwt = require("jsonwebtoken");

const middlewareController = {
    verifyToken: (req, res, next) =>{
        const token = req.headers.authorization;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, "custormerlogintoken", (err, user)=>{
                if(err){
                    return res.status(403).json({message: "Token is not valid"});
                }
                req.user = user;
                next();
            })
        } else {
            return res.status(401).json({message: "You're not authenticated"});
        }
    }
}

module.exports = middlewareController;