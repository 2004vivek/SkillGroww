const ratingandreview=require('../Modals/RatingAndReview')
const course=require('../Modals/Course')
const mongoose=require('mongoose')

//createrating
exports.createrating=async(req,res)=>{
    try {
        //get user id
        const userid=req.user.id
        console.log(userid)
       
        //fetch the data
        const {review,rating,courseid}=req.body
        //validation
        if(!review||!rating){
            return res.status(401).json({
                success:false,
                message:"All field are required"
            })
        }
        //check if user is enrolled or not
        const coursedetails=await course.findOne({_id:courseid,studentEnrolled:userid})
        if(!coursedetails){
            return res.status(404).json({
                success:false,
                message:"User is not enrolled in course"
            })
        }
        //check if user already review the course
        // let useridobj=new mongoose.Types.ObjectId(userid)
        // console.log("this is user",typeof useridobj)
        const alreadyreviewed=await ratingandreview.findOne({user:userid,course:courseid})
        console.log("alreadyreviewed",alreadyreviewed)
        if(alreadyreviewed){
            return res.status(400).json({
                success:false,
                message:"Course is already review by user"
            })
        }
        //create rating and review
        const createratingandreview=await ratingandreview({user:userid,course:courseid,rating,review})
        await createratingandreview.save()

        //update course with this rating/review
        const updatedcoursedetails=await course.findByIdAndUpdate(courseid,{$push:{
            ratingandreview:createratingandreview._id
        }},{new:true})
        console.log(updatedcoursedetails)
        //return res
        return res.status(200).json({
            success:true,
            message:"Rating and review successfully",
            ratingandreview:updatedcoursedetails
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

//getaveragerating
exports.getaveragerating=async(req,res)=>{
    try {
        //get course id
        const {courseid}=req.body

        //calculate the avg rating
        const avgrating=await ratingandreview.aggregate([
            {
                $match: {
                  course:new mongoose.Types.ObjectId(courseid)
                }
              },
              {
                $group: {
                  _id: "$course",
                  averageRating: {
                    $avg: {
                      $toDouble: "$rating"
                    }
                  }
                }
              }
           
        ])
       
        if(avgrating.length>0){
            res.status(200).json({
                success:true,
                avgrating:avgrating,
                message:"Average rating is succesfully computed"
            })
        }
        else{
             //if no rating/review exist
        return res.status(200).json({
            success:true,
            message:"Average rating is 0,no rating till now",
            avgrating:avgrating 
        })
        }

       
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
//getallrating 
exports.getallratingandreview=async(req,res)=>{
try {
    const allreview=await ratingandreview.find({}).sort({rating:-1}).populate({
        path:"user",
        select:"firstName lastName email image"
    })
    .populate({  
        path:"course",  
        // select:"courseName"
    }).exec()

    return res.status(200).json({
        success:true,
        message:"All reviews fetched successfuully",
        allreview:allreview

    })
} catch (error) {
    return res.status(500).json({
        success:false,
        error:error.message
    })
}
}


