const subsection=require('../Modals/SubSection')
const section=require('../Modals/Section')
const {uploadimagetocloudinary}=require('../utils/imageuploader')
require("dotenv").config()
exports.createsubsection=async(req,res)=>{
    try {
        //fetch data
        const {title,description,timeduration,sectionid}=req.body
    
        
        //extract files
        const uplodedvideo=req.files.videourls
        
        //validate
        if(!title||!description){
            return res.status(401).json({
                success:false,
                message:"All field are required"
            })
        }
        //upload video to cloudinary
        const uploadedtocloudinary=await uploadimagetocloudinary(uplodedvideo,process.env.FOLDER_NAME)
        console.log(uploadedtocloudinary.secure_url)
        //save the entry in db
        const updatedsubsection=await subsection.create({
            title,
            description,
            timeduration,
            videourl:uploadedtocloudinary.secure_url
        })
        //update section sechma
        const updatedsection=await section.findByIdAndUpdate(sectionid,{$push:{subsection:updatedsubsection._id}},{new:true}).populate("subsection").exec()
        //return res
        return res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            updatedsection:updatedsection
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error occured",
          error:error.message
        })
    }
}
exports.updatesubsection=async(req,res)=>{
    try {
         //fetch the data
    const {title,description,subsectionid,sectionid}=req.body

    //fetch the file
    let videourl;
    if(req.files && req.files.videourls){
        const video=req.files.videourls;

        //upload the video to cloudinary
        const uploadedToCloudinary=await uploadimagetocloudinary(video,process.env.FOLDER_NAME);
        videourl=uploadedToCloudinary.secure_url;

    }
    else{
        videourl=req.body.videourls;
    }
    
    //update in subsection schema
    const updatedsubsection=await subsection.findByIdAndUpdate(subsectionid,
        {$set:{
        title,description, videourl:videourl
    }},{new:true})
    console.log(updatedsubsection)

    //update in the section schema 
    const updatedsection=await section.findByIdAndUpdate(sectionid,{$addToSet:{subsection:updatedsubsection._id}},{new:true}).populate("subsection").exec();


    //return res
    return res.status(200).json({
        success:true,
        updatedsubsection:updatedsubsection,
        message:"Subsection updated successfully",
        updatedsection:updatedsection
    }) 
    } catch (error) {
        return res.status(500).json({
            success:false,
          error:error.message,   
           message:"Error occured",  
        })
    }
}
exports.deletesubsection=async(req,res)=>{
    try {
        const {sectionid,subsectionid}=req.body;
        const deletesubsection=await subsection.findByIdAndDelete(subsectionid)
        const updatedsection=await section.findByIdAndUpdate(sectionid,{$pull:{subsection:deletesubsection._id}},{new:true})
        return res.status(200).json({
            success:true,
            updatedsection:updatedsection,
            deletedsubsection:deletesubsection,
            message:"Subsection Deleted Successfully",

        })
    } catch (error) {
         return res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while deleting",
            
        })
    }
}