require('dotenv').config()
const mongoose=require("mongoose");
const express=require("express");
const app=express();
const port=process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE,{
                useNewUrlParser:true,
                useUnifiedTopology: true,
                 useCreateIndex:true
                }).then(()=>console.log("DB IS CONNECTED"))
                .catch(()=>console.log("DB IS CONNECTION FAILER"))
  

  app.listen(port,()=>console.log(`app is conected to the ${port}`))