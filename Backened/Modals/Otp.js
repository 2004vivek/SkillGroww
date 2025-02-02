const mongoose=require("mongoose")
const mailsender=require('../utils/mailsender')
const OtpSchema=new mongoose.Schema({
   email:{
    type:String,
    required:true
   },
   otp:{
    type:String,
    required:true
   },
   createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60//expires in 5 min
   }
   
})
const sendverificationmail=async(email,otp)=>{
    try {
        const mail=await mailsender(email,"Hi this is vivek here",`I hope you are fine.This is the otp for signup ${otp}`)
        console.log("email send successfully",mail)
        console.log("otp",otp)

    } catch (error) {
        console.log("error occured"+error)
        return res.status()
    }
}
OtpSchema.pre('save',async function(next){
    await sendverificationmail(this.email,this.otp)
    next();
})

module.exports=mongoose.model("otp",OtpSchema)