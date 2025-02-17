const mongoose=require("mongoose")
const courseProgressSchema=new mongoose.Schema({
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
   },
   courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"courses"
   },
   completedvideo:[{
     type:mongoose.Schema.Types.ObjectId,
    ref:"subsection"
   }]
})
module.exports=mongoose.model("courseProgress",courseProgressSchema)