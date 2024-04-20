const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        maxlength:32,
        required:true,
        trim:true
    },
    desc:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        maxlength:32,
        trim:true
    },
    category:{
        type:ObjectId,
        ref:Category
    },
    Stock:{
        type:Number,
    },
    sold:{
        type:Number,
        dafault:0
    },
    photo:{
        data:Buffer,
        contentType:String
    }

},{timestamps:true})


module.export=new mongoose.model("product",productSchema);