const express=require('express');
const router=express.Router();
const Person = require('./../models/Person.js');
const {jwtmiddleware,gentoken}=require('./../jwt');
router.post('/signup',async(req,res)=>{
    try{
        const newPerson=new Person(req.body);
        const savedPerson=await newPerson.save();
        const token=gentoken({id:savedPerson._id,username:savedPerson.username});
        //console.log(token);
        res.status(201).json({person:savedPerson,token:token});
    }catch(err){
        console.log(err);
        res.status(400).json({error:err.message});
    }
});
router.post('/login',async(req,res)=>{
    try{
        const{username,password}=req.body;
        const person=await Person.findOne({username});
        if(!person){
            return res.status(401).json({error:"Invalid username or password"});
        }
        const isMatch=await person.ComparePassword(password);
        if(!isMatch){
            return res.status(401).json({error:"Invalid username or password"});
        }
        const token=gentoken({id:person._id,username:person.username});
        res.status(200).json({person,token});
    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
})
router.get('/profile',jwtmiddleware,async (req,res)=>{
    try{
        const userid=req.user.id;
        const person=await Person.findById(userid);
        res.status(200).json(person);
    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
})
router.get('/',jwtmiddleware,async (req,res)=>{
    try{
        const data=await Person.find();
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
})
router.get('/:work',async(req,res)=>{
    try{
        const worktype=req.params.work;
        if(worktype=='chef' || worktype=='waiter' || worktype=='owner'){
            const data=await Person.find({work:worktype});
            res.status(200).json(data);

    }else{
        res.status(404).json({error:"Invalid work type"});
    }}catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
})
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedData=req.body;
        const result=await Person.findByIdAndUpdate(personId,updatedData,{
            new:true,
            runValidators:true
        })
        if(!result){
            res.status(404).json({error:"Person not found"});
        }
        console.log('data updated successfully');
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const result=await Person.findByIdAndDelete(personId);
        if(!result){    
            res.status(404).json({error:"Person not found"});   
    }
        console.log("Person deleted successfully");
        res.status(200).json({message:"Person deleted successfully"});
}catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }      
}); 
module.exports=router;