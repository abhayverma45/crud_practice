const jwt = require("jsonwebtoken");
const db=require("../model")
const User=db.user;
// const db = require("../helpers/db");
// const config = require("../config/config.json");
// const responseHelper = require('../helpers/customResponse');
module.exports = async (req, res, next) => {
   
    const authorization = req.headers.authorization;
    
    // console.log(authorization);
   
    if (!authorization) {
        // responseData.msg = 'UnAuthorized Accesss';
        res.status(500).json("user is not authorized")
    }
    const token = authorization.split(' ')[1];
  
    const secretKey = "9889D22341540031D3386132A7BDD38F4830474543C795D019561C0A308F501A";
    jwt.verify(token, secretKey, async (err, decoded) => {

       
         console.log("error",err)
        if (err) {
           
            res.status(500).json("user not authorized")
        }
        const user = await db.user.findOne({
            where: { user_id: decoded.userId },
        });
        req.user = user;
       
        next();
        })

};