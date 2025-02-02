const express=require('express')
const router=express.Router();
const {updateProfile,deleteaccount,getalluserdetails,updatedisplaypicture,getenrolledcourses}=require('../Controllers/Profile')
const {auth}=require('../Middleware/Auth')

//update the user profile

router.put("/updateprofile",auth,updateProfile)

//delete the user profile
router.delete("/deleteprofile/:id",auth,deleteaccount)

//get all user details
router.get("/get-user-details/:id",auth,getalluserdetails)

//get all the enrolled courses
router.get("/get-enrolled-courses/:id",auth,getenrolledcourses)

//update the user display pic
router.put("/update-pic",auth,updatedisplaypicture)

module.exports=router