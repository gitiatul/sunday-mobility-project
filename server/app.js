const express =require('express');
const dotenv = require('dotenv');
const mongoose =require('mongoose');
const cookieParser = require('cookie-parser');
const app=express();
app.use(cookieParser());
dotenv.config({path:"./config.env"});
require('./db/conn');
app.use(express.json());
app.use(require('./router/auth'));
const PORT=process.env.PORT;


app.listen(PORT,function(){
    console.log("server started ");
})

//