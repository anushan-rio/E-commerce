require('dotenv').config()
const mongoose=require("mongoose");
const express=require("express");
const app=express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//PORT
const port=process.env.PORT || 8000;

//DATABASE CONNECTIVITY
mongoose.connect(process.env.DATABASE,{
                useNewUrlParser:true,
                useUnifiedTopology: true,
                 useCreateIndex:true
                }).then(()=>console.log("DB IS CONNECTED"))
                .catch(()=>console.log("DB IS CONNECTION FAILER"))

//MIDDELWARE 
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


//ROUTER PATH
const authRoute=require("./Routers/auth");
const userRoute=require("./Routers/user");
const categoryRoute=require("./Routers/category");
const productRoute=require("./Routers/product");

//ROUTES
app.use('/api',authRoute);
app.use('/api',userRoute);
app.use('/api',categoryRoute)
app.use('/api',productRoute)



app.listen(port,()=>console.log(`app is conected to the ${port}`))