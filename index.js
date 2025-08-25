require("dotenv").config();
const express=require('express');
const app=express();  
const db=require('./db');
const bodyParser=require('body-parser');
const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send("Welcome to the Restaurant Management System API");
});
app.use('/person',personRoutes);
app.use('/menuitem',menuItemRoutes);
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("server started at port 3000");
});