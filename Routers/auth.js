const express=require('express');
const router = express.Router()
const {signout,signup,signin,isSignedIn}=require('../Controllers/authController')
const { check, validationResult } = require("express-validator");





router.post(
    "/signup",
    [
      check("name", "name should be at least 3 char").isLength({ min: 3 }),
      check("email", "email is required").isEmail(),
      check("password", "password should be at least 3 char").isLength({ min: 3 })
    ],
    signup
  );



router.post("/signin",[
    check("email", "email is required").isLength({ min: 3 }),
    check("password", "password is required").isLength({ min: 3 })
],signin)


router.get('/signout',signout)






module.exports=router;