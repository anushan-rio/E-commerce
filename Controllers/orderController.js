const { request } = require("express")
const {Order,ProductCart}=require("../Models/order")
const { populate } = require("../Models/user")

exports.getOrderbyId=(req, res, next, id)=>{
    Order.findById(id)
    populate("Products.Product", "name price")
    .exec((err,order)=>{
        if(err || !order){
            return res.json({
                error:"No user found"
            })
        }
        console.log("order-------------",order)
        req.order=order;
        
    })
    next();
}


exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile;
    const order=new Order(req.body.order)
    order.save((err,orders)=>{
        if(err){
            return res.json({error:"Error While Ordering"})
        }
        return res.json(orders)
    })
}

exports.getallorders=(req,res)=>{
    Order.find()
        .populate("User", "_id name")
        .exec((err,order)=>{
            if(err){
                    return res.json({error:"Error in Getting all orders"})
            }
            else{
                return res.json(order)
            }
        })
}


exports.getorderstatus=(req,res)=>{
    return res.json(Order.schema.path("status").enumValues)
}

exports.updatestatus=(req,res)=>{
    Order.update({_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err){
                return res.json({error:"updation error"})
            }
            return res.json(order)
        })
}