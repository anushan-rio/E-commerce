const User=require("../Models/user");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


const { check, validationResult } = require('express-validator');


exports.signup=(req,res)=>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const user=new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.json({err:"Not able to Saveuser in DB"})
        }
        return res.json({
            name:user.name,
            email:user.email,
            id:user._id
        })
    })
}


exports.signin=(req,res)=>{
    const {email,password}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.json({email:"email does not exist"})
        }
        if (!user.autheticate(password)) {
            return res.status(401).json({
              error: "Email and password do not match"
            });
          }
       const token = jwt.sign({ _id: user._id },process.env.SECRET);
        res.cookie("token",token,{expire:new Date() + 9999})
        const {_id,name,email,role}=user
        return res.json({token, user:{_id,name,email,role}})

    })
}



exports.signout=(req,res)=>{
    res.clearCookie("token")
    res.json({ message:"user signout sucessfull"})
}

//protected routes
exports.isSignedIn=expressJwt({
    secret:process.env.SECRET,
    userProperty: "auth"
})

//CUSTOM MIDDLEWARE
