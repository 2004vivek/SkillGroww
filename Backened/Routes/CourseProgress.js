const mongoose=require('mongoose');
const express=require('express')
const router=express.Router()
const {CourseProgress}=require('../Controllers/CourseProgress')
router.post("/course-progress",CourseProgress)
module.exports=router