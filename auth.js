const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const Person=require('./models/Person');
const bcrypt=require('bcrypt');
passport.use(new localStrategy({
    usernameField:'username',
    passwordField:'password'
},async(username,password,done)=>{
    try{
        //console.log("this is hitted",username,password);
        const user=await Person.findOne({username});
        if(!user){
            return done(null,false,{message:'Incorrect username'});
        }
        const isMatch=await user.ComparePassword(password);
        if(!isMatch){
            return done(null,false,{message:'Incorrect password'});
        }
        return done(null,user);
    }catch(err){
        return done(err);
    }
}));
module.exports=passport;