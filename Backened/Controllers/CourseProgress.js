const SubSection = require("../Modals/SubSection");
const Course=require("../Modals/Course")
const courseProgress=require('../Modals/CourseProgress')
exports.CourseProgress=async(req,res)=>{
    try {
        const {courseid,subsectionid}=req.body;

        if(!courseid||!SubSection){
            return res.status(401).json({message:"No Course Found"})
        }
        //checking if there is completed video or not
        let course=await courseProgress.findOne({courseId:courseid})
        console.log("this is courseprogress",course)

        if(!course){
           let completedlec = await courseProgress.create({courseId:courseid,completedvideo:[subsectionid]})
           await completedlec.save()
            return res.status(200).json({
                success:true,
                completedlecture:course,
                message:"Lecture Marked as Completed"
            })
        }
        else if(!course.completedvideo.includes(subsectionid)){ 
            course.completedvideo.push(subsectionid)
            await course.save()
            return res.status(200).json({
                success:true,
                completedlecture:course,
                message:"Lecture Marked as Completed"
            })
        }
        else{
            return res.status(400).json({
                message:"Lecture already marked"
            })
        }

       


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while getting the lecture completed details",
            error:error.message
        })
    }
}