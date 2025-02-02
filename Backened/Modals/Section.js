const mongoose=require("mongoose")
const SectionSchema=new mongoose.Schema({
   sectionname:{
    type:String
   },
   subsection:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"subsection"
   }],
   
})
module.exports=mongoose.model("section",SectionSchema)