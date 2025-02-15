const mongoose=require('mongoose');
const express=require('express')
const router=express.Router()
const {auth}=require('../Middleware/Auth')
const {CourseProgress}=require('../Controllers/CourseProgress')
router.post("/course-progress",auth,CourseProgress)
module.exports=router