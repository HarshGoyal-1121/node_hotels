const e = require('express');
const jwt=require('jsonwebtoken');

const jwtmiddleware=(req,res,next)=>{
    const headers=req.headers;
    if((!headers.authorization) || (!headers.authorization.startsWith('Bearer '))){
        return res.status(401).json({error:"Unauthorized"});    
    }
    const authtoken=req.headers.authorization.split(' ')[1];
    if(!authtoken){
        res.status(401).json({error:"Unauthorized"});
    }
    try{
        const decoded=jwt.verify(authtoken,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(401).json({error:"Invalid token"});
    }
}
const gentoken=(userData)=>{
    const token=jwt.sign({userData},process.env.JWT_SECRET,{expiresIn:'30000s'});
    return token;
}
module.exports={jwtmiddleware,gentoken};
