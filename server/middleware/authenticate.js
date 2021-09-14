const express =require('express');
const User=require("../model/userSchema");
const jwt =require("jsonwebtoken");
const router =express.Router();
const cookieParser = require('cookie-parser'); 
router.use(cookieParser());


const Authenticate=async(req,res,next) => {
try{
    
    console.log("hi authentication");
    const token=req.cookie.jwtoken;
    console.log(req.cookie.jwtoken);
    const verifyToken =jwt.verify(token,process.env.SECRET_KEY);
    const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
    console.log(rootUser);
    if(!rootUser){
        throw new Error('User not Found');
    }
         req.token=token;
         req.rootUser=rootUser;
         req.userID=rootUser._id;
         next();
}
catch(err){
    res.status(401).send('Unauthorized:No token provided');
    console.log(err);
}
}

module.exports=Authenticate;