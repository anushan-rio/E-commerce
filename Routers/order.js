const express=require("express")
const router=express.Router();

const {isAdmin,isAutheticate,isSignedIn}=require("../Controllers/authController")
const {getUserbyId,pushOrderInPurchaseList}=require("../Controllers/userControllers")
const {updateStock}=require("../Controllers/productController")
const {getOrderbyId,createOrder,getallorders,updatestatus,getorderstatus}=require("../Controllers/orderController")


router.param("userId",getUserbyId)
router.param("orderId",getOrderbyId)

router.post("/order/create/:userId",isSignedIn,isAutheticate,pushOrderInPurchaseList,updateStock,createOrder)
router.get("/order/all/:userId",isSignedIn,isAutheticate,isAdmin,getallorders)

router.put("/order/:orderId/status/:userId",isSignedIn,isAutheticate,isAdmin,updatestatus)
router.get("/order/status/:userId",isSignedIn,isAutheticate,isAdmin,getorderstatus)


module.exports=router