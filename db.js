require("dotenv").config();
const mongoose=require('mongoose');
const mongo_url=process.env.MONGO_URL;
mongoose.connect(mongo_url);
const db=mongoose.connection;

db.on('connected',()=>{
    console.log("MongoDB connected successfully");
}); 
db.on('error',(err)=>{
    console.log("MongoDB connection failed",err);
}); 
db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
});
module.exports=db;