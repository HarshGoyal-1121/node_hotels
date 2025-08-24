const mongoose=require('mongoose');
const mongoUrl="mongodb://127.0.0.1:27017/princeDB";
mongoose.connect(mongoUrl);
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