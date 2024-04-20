const mongosse=require('mongoose');
const { createHmac } = require('node:crypto');
import { v1 as uuidv1 } from 'uuid';

var userSchema=new mongosse.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
        require:true,
        trim:true
    },
    salt:{
        String
    },
    role:{
        type:String,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
},
{timestamps:true}
)

userSchema.method={
    
    authenticate:function(){
        return this.securepassword(plainpassword)===this.encry_password
    },
    
    securepassword:function(plainpassword){
        if(!password){
            return "";
        }
        try{
            return  createHmac('sha256',this.salt)
            .update(plainpassword)
            .digest('hex');
        }
        catch(err){

        }
    }
}

userSchema.virtual("password")
    .set(function(){
        this._passsword=password;
        this.salt=uuidv4();
        this.encry_password=securepassword(password);
    })
    .get(function(){
        this._passsword;
    })




module.exports=mongosse.model("User",userSchema)