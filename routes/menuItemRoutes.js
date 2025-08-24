const express=require('express');
const router=express.Router();
const MenuItem = require('./../models/MenuItem');
router.post('/',async(req,res)=>{
    try{
        const newMenuItem=new MenuItem(req.body);
        const savedMenuItem=await newMenuItem.save();
        res.status(201).json(savedMenuItem);
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:err.message});
    }   
});
router.get('/',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }       
});
router.get('/:taste',async(req,res)=>{
    try{
        const tasteType=req.params.taste;
        if(tasteType=='sweet' || tasteType=='spicy' || tasteType=='sour'){
            const data=await MenuItem.find({taste:tasteType});
            res.status(200).json(data);
    }else{
        res.status(404).json({error:"Invalid taste type"});
    }
}catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
});
router.put('/:id',async(req,res)=>{
    try{
        const menuItemId=req.params.id;
        const menuItemUpdatedData=req.body;
        const result=await MenuItem.findByIdAndUpdate(menuItemId,menuItemUpdatedData,{
            new:true,
            runValidators:true
        })
        if(!result){
            res.status(404).json({error:"Menu item not found"});
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
        const menuItemId=req.params.id;
        const result=await MenuItem.findByIdAndDelete(menuItemId);
        if(!result){
            res.status(404).json({error:"Menu item not found"});
        }
        console.log('data deleted successfully');
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }   
});
module.exports=router;