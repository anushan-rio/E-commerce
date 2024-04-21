const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;


const ProductSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:Product
    },
    name:String,
    count:Number,
    price:Number
})
const OrderSchema=new mongoose.Schema({
    product:[ProductSchema],
    transaction_id:{},
    amount:{
        type:String
    },
    address:{
        type:String
    },
    update:Date,
    user:{
        type:ObjectId,
        ref:User
    }

},{timestamps:true})


const Order=mongoose.model("Order",OrderSchema)
const ProductCart=mongoose.model("ProductCart",ProductSchema)

module.exports={Order,ProductCart}