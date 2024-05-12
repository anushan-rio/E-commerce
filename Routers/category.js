const express=require('express')
const router = express.Router()



const {getcategorybyid,createcategory,getCategory,getAllcategory,updatecategory,deletecategory}=require("../Controllers/categoryController")
const {isSignedIn,isAutheticate,isAdmin}=require("../Controllers/authController");
const {getUserbyId}=require("../Controllers/userControllers")

router.param("userId",getUserbyId)
router.param("categoryid",getcategorybyid)


router.post("/category/create/:userId",isSignedIn,isAutheticate,isAdmin,createcategory);
router.get("/category/:categoryid",getCategory)
router.get("/categies",getAllcategory)
router.put("/category/:categoryid/:userId",isSignedIn,isAutheticate,isAdmin,updatecategory)
router.delete("/category/:categoryid/:userId",isSignedIn,isAutheticate,isAdmin,deletecategory)

module.exports=router