const mongosse=require('mongoose');
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");


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
    salt:String,
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

userSchema.methods={
    
    autheticate: function(plainpassword) {
        return this.securepassword(plainpassword) === this.encry_password;
      },
    
    securepassword:function(plainpassword){
        if(!plainpassword){
            return "";
        }
        try{
            return crypto
            .createHmac("sha256", this.salt)
            .update(plainpassword)
            .digest("hex");
            
        }
        catch(err){
            console.log("if4")
            return "";
        }
    }
}

userSchema.virtual("password")
    .set(function(password){
        this._passsword=password;
        this.salt=uuidv1();
        this.encry_password=this.securepassword(password);
    })
    .get(function(){
       return this._passsword;
    })




module.exports=mongosse.model("User",userSchema)