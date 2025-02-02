const cloudinary=require('cloudinary').v2
const uploadimagetocloudinary=async(file,folder,quality)=>{
        const option={folder}
        if(quality){
            option.quality=quality
        }
        option.resource_type="auto"
        const result=await cloudinary.uploader.upload(file.tempFilePath,option)
        return result
   
}
exports.uploadimagetocloudinary=uploadimagetocloudinary