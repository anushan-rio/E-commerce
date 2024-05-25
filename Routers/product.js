const express=require("express")
const router=express.Router();
const {getproductbyId,createProduct}=require("../Controllers/productController")
const {isAdmin,isAutheticate,isSignedIn}=require("../Controllers/authController")
const {getUserbyId}=require("../Controllers/userControllers")

router.param("userId",getUserbyId)
router.param("productid",getproductbyId)


router.post("/product/create/:userId",isSignedIn,isAutheticate,isAdmin,createProduct)




module.exports=router