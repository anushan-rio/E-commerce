const User=require("../Models/user");


exports.getUserbyId=(req, res, next, id)=>{
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
   
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    console.log("----",req.profile)
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


exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach(product => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });

  //store thi in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list"
        });
      }
      next();
    }
  );
};