const express=require('express')
const router = express.Router()



const {getcategorybyid,createcategory,getcategory,getAllcategory,updatecategory}=require("../Controllers/categoryController")
const {isSignedIn,isAutheticate,isAdmin}=require("../Controllers/authController");
const {getUserbyId}=require("../Controllers/userControllers")

router.param("userId",getUserbyId)
router.param("categoryid",getcategorybyid)


router.post("/category/create/:userId",isSignedIn,isAutheticate,isAdmin,createcategory);
router.get("/category/:categoryid",getcategory)
router.get("/categies",getAllcategory)
router.put("/category/:categoryid/:userId",isSignedIn,isAutheticate,isAdmin,updatecategory)


module.exports=router