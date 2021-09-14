const express =require('express');
const bcrypt =require('bcryptjs');
const router =express.Router();
require('../db/conn');
const User=require("../model/userSchema");
router.use(express.json());
const authenticate =require("../middleware/authenticate");
const cookieParser = require('cookie-parser'); 

//BY using async
router.use(cookieParser());

router.post('/signup', async(req,res) => {
    const {name,email,phone,work,password,cpassword}=req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
                 res.status(422).json({error:"filled missing"})
       }
    try{
        const RegisterUser= await User.findOne({email:email});
        if(RegisterUser){
            return (res.status(422).json({message:"Email already exist"}))
        }
        else if(password != cpassword){
            return res.status(422).json({message:"Password not match"})
        }
        else{
            const user=new User({name,email,phone,work,password,cpassword});
            const usersave =await user.save();
            if(usersave){
                res.status(201).json({message:"User created"});
            }else{
                res.status(500).json({error:"Failed to Registers"})
            }
        }
        
    }
    catch(err){
        console.log(err)
    }
});

router.post("/login",async(req,res) =>{
          let token;
          const {email ,password}=req.body;

          if(!email || !password){
            res.status(422).json({error:"filled missing"})
          }
          try{
              const loginUser= await User.findOne({email:email});
              if(loginUser){
                const loginPassword= await bcrypt.compare(password,loginUser.password)

                token= await loginUser.generateAuthToken();

                res.cookie("jwtoken",token,{
                    expire:new Date(Date.now()+ 25892000000),
                    httpOnly:true
                })

                if(loginPassword){
                    res.status(201).json({message:"Login succesfully"});
                }
                else{
                    res.status(400).json({message:"Invalid Credentials"});
                }
              }
              else{
                res.status(400).json({message:"Invalid Credentials"});
              }
          }
          catch(err){
            console.log(err);
          }
});

router.get("/About",authenticate,function(req,res){
    console.log("hi aut")
    res.send(req.rootUser);
});

module.exports =router;

