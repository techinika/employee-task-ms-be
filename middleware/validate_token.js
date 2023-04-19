const jwt = require("jsonwebtoken")
const async_handler = require("express-async-handler");
const { json } = require("body-parser");

let requser;

const validate_token = async_handler(async(req, res, next) => {
    let token;
    let auth_header = req.headers.Authorization || req.headers.authorization;
    if(auth_header && auth_header.startsWith("Bearer")){
        token = auth_header.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401).json({
                    error: "User is not authorised"
                })
            }
            // requser = decoded.user;
            // next();
            console.log(decoded)
        })
    }else{
        res.status(401).json({error: "User not authorised, or missing token"})
    }
})

module.exports = validate_token;