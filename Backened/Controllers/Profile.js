const { json } = require("express");
const profile = require("../Modals/Profile");
const user = require("../Modals/User");
const CourseProgress = require("../Modals/CourseProgress");
const { uploadimagetocloudinary } = require("../utils/imageuploader");
require("dotenv").config();

exports.updateProfile = async (req, res) => {
  try {
    //get data
    const {
      dob = "",
      phoneNumber,
      about = "",
      gender,
      firstName,
      lastName,
    } = req.body;
    //get userid
    const userid = req.user.id;
    //validation
    if (!phoneNumber || !gender) {
      return res.status(401).json({
        success: false,
        message: "All field are required",
      });
    }

    //updating the user first and last name
    const updateduserdetails = await user.findByIdAndUpdate(
      { _id: userid },
      { firstName, lastName },
      { new: true }
    );

    //find the profile
    const userdetails = await user.findById(userid);
    console.log(userdetails);
    const profileid = userdetails.additionalDetails;
    const profiledetails = await profile.findById(profileid);

    //update profile
    profiledetails.dob = dob;
    profiledetails.phoneNumber = phoneNumber;
    profiledetails.about = about;
    profiledetails.gender = gender;
    await profiledetails.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated Successfully",
      profiledetails: profiledetails,
      updateduserdetails: updateduserdetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured when updating the profile",
      error: error.message,
    });
  }
};
exports.deleteaccount = async (req, res) => {
  try {
    //get id
    const id = req.user.id;
    //validation
    const userdetails = await user.findById(id);
    if (!userdetails) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    //delete profile
    await profile.findByIdAndDelete(
      { _id: userdetails.additionalDetails },
      { new: true }
    );
    // TODO:uneroll user from all enrolled course
    //delete user
    await user.findByIdAndDelete(id, { new: true });

    //TODO:how can we schedule a req
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error occured",
      error: error.message,
    });
  }
};
exports.getalluserdetails = async (req, res) => {
  try {
    //fetching all the user details
    const { id } = req.params;
    const allUserDetails = await profile.findById({ _id: id });
    return res.status(200).json({
      success: true,
      userdetails: allUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "error while fetching the data",
    });
  }
};
exports.updatedisplaypicture = async (req, res) => {
  try {
    //fetch the files
    const images = req.files.file;
    console.log(images);
    //validation
    if (!req.files || !req.files.file) {
      return res.status(401).json({
        success: false,
        message: "Please,Upload the files to be uploaded",
      });
    }

    //uploading the files to the cloudinary
    try {
      const url = await uploadimagetocloudinary(
        images,
        process.env.FOLDER_NAME
      );

      //fetching the user
      const userid = req.user.id;
      await user.findByIdAndUpdate(
        { _id: userid },
        { image: url.secure_url },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        url: url.secure_url,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Couldnot upload a image",
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating the profile",
      error: error.message,
    });
  }
};

exports.getenrolledcourses = async (req, res) => {
  try {
    const userid = req.params.id;
    const userdetails = await user
      .findById({ _id: userid })
      .populate({
        path: "courses",
        populate: { path: "coursecontent", populate: { path: "subsection" } },
      })
      .exec();

    //checking if the user is logged or not
    if (!userdetails) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    //logic for finding courseprogress for each course
    let updatedcourse = [];
    let userdetail;
    for (const course of userdetails?.courses) {
      let totalvideos = 0;
      let completedvideo = 0;

      //calculating the total video
      for (const section of course?.coursecontent) {
        totalvideos += section?.subsection?.length || 0;
      }

      console.log("this is total video",totalvideos)
      console.log("this is courseid",course._id)

      //calculating the completed video
      const progress = await CourseProgress?.findOne({
        courseId: course._id,
        userId:userid,
      });
      
      console.log("this is progress report",progress)
      let courseprogress = progress?.completedvideo?.length || 0;

     

      let coursecompletedprogress = totalvideos > 0 ? (courseprogress / totalvideos) * 100 : 0;


      // userdetail.coursecompletedprogress= Math.round(coursecompletedprogress)
      updatedcourse.push({
        ...course.toObject(),
        coursecompletedprogress: Math.round(coursecompletedprogress),
      });
    }

    // console.log("this is userdetails", userdetails);
    return res.status(200).json({
      success: true,
      userdenrolled:updatedcourse,
      // userdetails: updatedcourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error While fetching the course details",
      error: error.message,
    });
  }
};

exports.InstructorDashboard=async(req,res)=>{
  try {
   let User= await user.findById({_id:req.user.id}).populate({path:"courses",populate:{path:"studentEnrolled"}});
   
   let totalcourses=User?.courses?.length;
   let totalstudent=User?.courses?.reduce((sum,course)=>course.studentEnrolled.length+sum,0)

  let price= User?.courses?.reduce((sum,course)=>parseInt(course.price)+sum,0)
   let totalamountrecieve=totalcourses*price
   console.log("this is totalcourse bhai",totalcourses);
   console.log("this is pricr",totalamountrecieve)
   console.log("this is totalstudent",totalstudent)
  //  console.log("this is user bhai",price);


   return res.status(200).json({
    success:true,
    Courses:User?.courses,
    totalcourses,
    totalstudent,
    totalamountrecieve,
    message:"instructor dashboard fetched successfully" 
   })
    
  } catch (error) {
    return res.status(500).json({
      success:false, 
      message:"error while fetching instructor dashboard",
      error:error.message
    })
  }
}
