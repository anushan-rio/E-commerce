const express=require('express')
const router=express.Router()

const {getUserbyId,getUser,updateUser}=require("../Controllers/userControllers")
const {isSignedIn,isAutheticate,isAdmin}=require("../Controllers/authController")


router.param("userId",getUserbyId)

router.get("/user/:userId",isSignedIn,isAutheticate,getUser)
router.put("/user/:userId",isSignedIn,isAutheticate,updateUser)
module.exports=router