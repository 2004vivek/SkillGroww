const section=require('../Modals/Section')
const course=require('../Modals/Course')
const mongoose=require('mongoose')
const createsection=async(req,res)=>{
    try {
        //fetch the data
        const {sectionname,courseid}=req.body 
        //data validation
        if(!sectionname){
            return res.status(401).json({
                success:false,
                message:"Please fill all the fields",
                error:error.message
            })
        }
        //create section
        const createsection=await section.create({sectionname})
        //update course with section objectId
        const courseidbyobjId = new mongoose.Types.ObjectId(courseid);
        const updatedcourse=await course.findByIdAndUpdate(
            courseidbyobjId
        ,{
            $push:{
                coursecontent:createsection._id
            }
        },{new:true}).populate("coursecontent").exec()
        //return res
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            data:createsection
        })

    } catch (error) {
        return res.status(200).json({
            success:false,
            message:"error occured while creating a section",
            error:error.message,
           
        })
    }
    
}
exports.updatesection=async(req,res)=>{
   try {
    //take the updated input as re ki body //i removed courseid remind me
    const {sectionname,sectionid,courseid}=req.body
    console.log("this is sectionid",sectionid)
    //validation
    if(!sectionname||!sectionid){
        return res.status(401).json({
            success:false,
            message:"Please fill all the fields",
           
        })
    }
    //update data in section
    const updatedsection=await section.findByIdAndUpdate(sectionid,{$set:{sectionname:sectionname}},{new:true})

    //update the data in courseschema
    //donot use push bcse it will create duplicate entry but it should not id therefore use $addtoSet
    const updatedcourse=await course.findByIdAndUpdate(courseid,{$addToSet:{coursecontent:updatedsection._id}},{new:true}).populate({
        path:"coursecontent",populate:{
            path:"subsection"
        }
    })

    return res.status(200).json({
        success:true,
        // updatedsection:updatedsection,
        message:"Section Updated Successfully",
        updatedcourse:updatedcourse
    })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"error occured while updating a section",
        error:error.message,
    })
   } 
}
exports.deletesection=async(req,res)=>{
    try {
        //get the id--we are sending in params
        const {courseid,sectionid}=req.body
        const deletedsection=await section.findByIdAndDelete(sectionid)
        const updatedcourse=await course.findByIdAndUpdate(courseid,{$pull:{coursecontent:deletedsection._id}})
        return res.status(200).json({
            success:false,
            updatedcourse:updatedcourse,
            message:"Section Deleted Successfully!"
        })

    } catch (error) {
        return res.status(200).json({
            success:false,
            message:"error occured while deleting a section",
            error:error.message,
           
        })
    }
}
exports.createsection=createsection