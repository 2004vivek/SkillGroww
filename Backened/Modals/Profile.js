const mongoose=require("mongoose")
const profileSchema=new mongoose.Schema({
    gender:{
        type:String
    },
    dob:{
        type:String
    },
    about:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    proffession:{
        type:String,
        // required:true
    }
})
module.exports=mongoose.model("Profile",profileSchema)