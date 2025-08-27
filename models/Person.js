const mongoose = require('mongoose');
const bcrypt=require("bcrypt");
const personSchema=new mongoose.Schema({
    name: {type: String, required: true},   
    age: {type: Number, required: true},
    work:{type: String,enum:['chef','waiter','owner'] ,required: true},
    mobile:{type:Number,required:true},
    address:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    salary:{type:Number,required:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});
personSchema.pre('save',async function(next){
    const person=this;
    if(!person.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(this.password,salt);
        this.password=hash;
        next();
    }catch{
        return next(err);
    }
})
personSchema.methods.ComparePassword=async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}
const Person=mongoose.model('Person',personSchema);
module.exports=Person;