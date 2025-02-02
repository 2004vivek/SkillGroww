const express=require('express');
const router=express.Router()

const {signup,login,sendotp,changepassword}=require('../Controllers/Auth')
const {resetpasswordtoken,resetpassword}=require('../Controllers/ResetPassword')
// const {auth}=require('../Middleware/Auth')


//route for user signup
router.post("/signup",signup)

//route for user login
router.post("/login",login)

//route for sending otp to user email
router.post("/sendotp",sendotp)

//route for changing password
router.post("/changepassword",changepassword)

//route for generating a reset password token
router.post("/reset-password-token",resetpasswordtoken)

//route for resetting the user password after verification
router.post("/reset-password",resetpassword)



module.exports=router






