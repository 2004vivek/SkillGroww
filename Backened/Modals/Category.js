const mongoose=require("mongoose")
const CategorySchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  course:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"courses"
  }]
})
module.exports=mongoose.model("category",CategorySchema)