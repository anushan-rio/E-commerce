const User=require("../Models/user");


exports.getUserbyId=(req, res, next, id)=>{
    console.log("ID------1-------",id)
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.json({
                error:"No user found"
            })
        }
        console.log("ID-------------",user)
        req.profile=user;
    })
    next();
}

exports.getUser=(req,res)=>{
   console.log("ID------2-------")
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    return res.json(req.profile)
}

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate({_id:req.profile._id},
                            {$set:req.body},
                            {new:true,useFindAndModify:false},
                                (err,user)=>{
                                    if(err || !user){
                                        return res.json({
                                            error:"Error in update"
                                        })
                                    }
                                    user.salt=undefined;
                                    user.encry_password =undefined;
                                    res.json(user)
                                }
                            )
}