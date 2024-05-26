const express=require("express")
const router=express.Router();
const {getproductbyId,createProduct,getAllProducts,getAllUniqueCategories,getProduct,photo,updateProduct,deleteProduct}=require("../Controllers/productController")
const {isAdmin,isAutheticate,isSignedIn}=require("../Controllers/authController")
const {getUserbyId}=require("../Controllers/userControllers")

router.param("userId",getUserbyId)
router.param("productid",getproductbyId)


router.post("/product/create/:userId",isSignedIn,isAutheticate,isAdmin,createProduct)

router.get("/product/:productid",getProduct);
router.get("/product/photo/:productid", photo);

router.delete(
    "/product/:productid/:userId",
    isSignedIn,
    isAutheticate,
    isAdmin,
    deleteProduct
  );
  
  //update route
  router.put(
    "/product/:productid/:userId",
    isSignedIn,
    isAutheticate,
    isAdmin,
    updateProduct
  );

  router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports=router