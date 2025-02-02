const Course=require('../Modals/Course')
const mongoose=require('mongoose')
const Category=require('../Modals/Category')
const User=require('../Modals/User')
const SubSection=require('../Modals/SubSection')
const Section=require('../Modals/Section')
const {uploadimagetocloudinary}=require('../utils/imageuploader')
const CourseProgress=require("../Modals/CourseProgress")

const createcourse=async(req,res)=>{
    try{
        //fetch the data
        const {coursename, coursedescription,whatyouwilllearn,price,category,tag,instruction,status}=req.body
        // const validtag=tag.filter((item)=>item && item!=="undefined")

        //fetch the files
        const images=req.files.thumbnails
        

        //validation
        if(!coursename||!coursedescription||!whatyouwilllearn||!price||!category||!images){
            return res.status(400).json({
                success:false,
                message:"All Fields are required"
            })
        }

        //check for instructor --even if validation is done by middleware? why? for each we will have an instructor name

        const userid=req.user.id
        const instructordet=await User.findById(userid);
        console.log("Instructor Details",instructordet)

        //ToDO:verify that userid and instructor._id are same or different ?

        if(!instructordet){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        //check given category is valid or not
        const categoryDetails=await Category.findById(category)
        console.log("this is category name " ,categoryDetails)
        if(!categoryDetails){
            return res.status(401).json({
                success:false,

                message:"Category details is not found"
            })
        }

        //upload image to cloundinary
        const result=await uploadimagetocloudinary(images,process.env.FOLDER_NAME)
        console.log("this is uploade image link ",result)
        const thumbnailurl = result.secure_url;

        //create an entry in db for new course
        const updatedcourse=await Course.create({
            coursename,
            coursedescription,
            whatyouwilllearn,price,
            category:categoryDetails._id,
            instructor:instructordet._id,
            thumbnails:thumbnailurl,
            instruction:JSON.parse(instruction),
            tag:JSON.parse(tag),
            status:status
        })

        //add new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructordet._id},
            {$push:{
                courses:updatedcourse._id
            }},
            {new:true}
        )

        // update the category
        await Category.findByIdAndUpdate(
            {_id:category},{
                $push:{
                    course:updatedcourse._id
                },
            },{
                new:true
            }
        )

        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:updatedcourse
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error occured while creating course",
            error:error.message
        })
    }
}

//edit a course
exports.editcourses=async(req,res)=>{

   
    try {
        const id=req.params.id
        //fetch all the data
        const {coursename, coursedescription,whatyouwilllearn,price,category,tag,instruction,thumbnails}=req.body

        const tags=JSON.parse(tag)
        

         //upload the video to cloudinary
        let videourl;
        if(req.files && req.files.thumbnails){
            const video=req.files.thumbnails;

            
            const uploadedToCloudinary=await uploadimagetocloudinary(video,"vivek");
            videourl=uploadedToCloudinary.secure_url
        }

        const updatedcourse=await Course.findByIdAndUpdate(id,{coursename:coursename,coursedescription:coursedescription,whatyouwilllearn:whatyouwilllearn,price:price,category:category,tag:tags,instruction:JSON.parse(instruction),thumbnails:videourl})
      

        console.log("this is video",videourl) 

        return res.status(200).json({
            success:true,
            updatedcourse:updatedcourse,
            message:"Course Fetched Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }


}


//get all course
const getallcourses=async(req,res)=>{
    try {
        
        const {id}=req.params;
        const allcourses=await Course.find({instructor:id},{}).populate("instructor").populate({path:"coursecontent",populate:{path:"subsection"}}).exec()
     
        return res.status(200).json({
            success:true,
            allcourses:allcourses,  
           
            message:"All courses fetched Successfully",
           
        })
    } catch (error) { 
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"cannot get the courses",
            error:error.message
        })
    }
}

//updating the status of the course
exports.coursestatusupdate=async(req,res)=>{
    try {
        const {courseid,status}=req.body;

        console.log("this is status ",status)

        if(!status){
            return res.json({"message":"Please tick a checkbox"});
        }

        const coursedetails=await Course.findByIdAndUpdate(courseid,{$set:{status:status}},{new:true})

        return res.status(200).json({
            message:true,
            message:"Course Created Successfully and it is  Published!",
            
        });


    } catch (error) {
        return res.status(500).json({
            message:false,
            message:"Error While Creating an course",
            error:error.message
        })
    }
}


//delete a course
exports.deletecourse=async(req,res)=>{
    const {courseid}=req.body;

    try {
     //find the course
    const course=await Course.findById(courseid);
    if(!course){
        return res.status(400).json({message:"No course found with this id"})
    }
    
    //uneroll student from course

    //delete section and subsection
    const coursedetails=course.coursecontent;
   for(let sectionid of coursedetails) {
    const section=await Section.findById(sectionid);
   if(section.subsection){
    for (const subsection of section.subsection) { 
        console.log("this is course subsection",subsection);
        await SubSection.findByIdAndDelete(subsection)
     }
   }
     await Section.findByIdAndDelete(sectionid)
   }

   //delete a course 
   const updatedcourse=await Course.findByIdAndDelete(courseid);
   res.status(200).json({
    success:true, 
    updatedcourse:updatedcourse, 
    message:"Course Deleted Successfully"
   })
   
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error Occured",
            error:error.message
        })
    }

}

exports.getcoursedetails=async(req,res)=>{
    try {
        //get id 
        const {courseid}=req.body
        
        //find course details
        const coursedetails=await Course.findById({_id:courseid}).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }

        })
        .populate("ratingandreview")
        .populate({
            path:"coursecontent",
            populate:{
                path:"subsection"
            }
        })
        .populate({
            path:"studentEnrolled",
            populate:{
                path:"courses"
            }
        }).exec()

        //validation
        if(!coursedetails){
            return res.status(400).json({
                success:false,
                message:`could find the course with this ${courseid}`
            })
        }

        let courseprogress=await CourseProgress.findOne({courseId:courseid});
        let completedvideoes=courseprogress?.completedvideo


        return res.status(200).json({
            success:true,
            message:"Course details are fetched successfully",
            coursedetails:coursedetails,
            completedvideoes:completedvideoes
           
        })
    } catch (error) {
        return res.status(500).json({
           succes:false,
           error:error.message 
        })
    }
}
exports.createcourse=createcourse
exports.getallcourses=getallcourses    