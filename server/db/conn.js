const mongoose =require('mongoose');

const DB=process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(function(){
    console.log("database connected");
}).catch((err) => console.log("DB not connected"));