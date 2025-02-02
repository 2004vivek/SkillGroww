const express=require('express')
const router=express.Router()

const {createcourse,getallcourses,getcoursedetails,coursestatusupdate,deletecourse,editcourses}=require('../Controllers/course')


//middleare
const {auth,isstudent,isinstructor, isadmin}=require('../Middleware/Auth')


//category controller
const {createcategory,getallcategory,categorypagedetails}=require('../Controllers/category')

//section controller
const {createsection,updatesection, deletesection}=require('../Controllers/Section')

//subsection controller
const {createsubsection,updatesubsection,deletesubsection}=require('../Controllers/SubSection'
)

//rating and reviews controllers
const {createrating,getaveragerating,getallratingandreview}=require('../Controllers/ratingandreview')


//course can be only created by instructor
router.post("/createcourse",auth,isinstructor,createcourse)

//add section to a course
router.post("/addsection",auth,isinstructor,createsection)

//update a section
router.post("/updatesection",auth,isinstructor,updatesection)

//delete a section
router.post("/deletesection",deletesection)

//add a subsection
router.post("/creatsubsection",auth,isinstructor,createsubsection)

//update subsection
router.post("/updatesubsection",auth,isinstructor,updatesubsection)

//delete the subsection
router.post("/deletesubsection",auth,isinstructor,deletesubsection)

//get all registered courses
router.get("/getallcourses/:id",getallcourses)

//get the course details
router.post("/getcoursedetails",getcoursedetails)

//edit a course
router.post("/editcourse/:id",auth,isinstructor,editcourses)

//delete course
router.post("/deletecourse",auth,isinstructor,deletecourse)

//create category
router.post("/createcategory",auth,isadmin,createcategory)

//get all category
router.get("/getallcategory",getallcategory)

//get the all the category details
router.post("/getcategorydetails",categorypagedetails)

//update the status of the course
router.post("/updatecoursestatus",auth,isinstructor,coursestatusupdate);

//create the rating
router.post("/createrating",auth,isstudent,createrating);

//get average rating
router.post("/averagerating",auth,getaveragerating)

//get all the rating and review
router.get("/getreviews",getallratingandreview)

module.exports=router