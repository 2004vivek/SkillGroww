//password reset karne ke leye email aayega jisme link hoga aur wo navigate karega reset wla ui me
const user=require("../Modals/User")
const mailsender=require("../utils/mailsender")
const bcrypt=require("bcrypt")
//resetpasswordtoken
const resetpasswordtoken=async(req,res)=>{
    try {
         //get the email from req body
    const {email}=req.body
    //check user for this email,email validation
    const checkinguser =await user.findOne({email:email})
    if(!checkinguser){
        return res.status(401).json({
            success:false,
            message:"User not Found"
        })
    }
    //generate token
    const token=crypto.randomUUID()
    console.log("token",token)

    //jo token generate kiya hai usse update user by adding token and expiration time
    const updateduserdetails=await user.findOneAndUpdate({email:email},{
        token:token,
        resetPasswordExpires:Date.now()+5*60*1000
    },{new:true})

    //create url
   const url=`http://localhost:5173/update-password/${token}`
    //send mail containing url
    await mailsender(email,"PassWord Reset Link",`Password Reset Link :${url}`)

    return res.json({
    success:true,
    message:"Email Sent Successfully"
})
    } catch (error) {
        return res.json({
            success:false,
            message:"Error Occured while Reset the password,Try Again",
            error:error.message
        })
    }
   
}

//resettpassword
const resetpassword=async(req,res)=>{
    try {
         //data fetch
    const {password,confirmpassword,token}=req.body
    //yaha par token toh params se bhi le sakte hai par humne req ki body me kaise leya frotened ne token ko body mai dal deya

    //validation
    if(password !==confirmpassword){
        return res.json({
            success:false,
            message:"Password do not matching"
        })
    }
    //get user details from db using token
    const userdetails=await user.findOne({token})
    //if no entry--invalid token
    if(!userdetails){
        return res.json({
            success:false,
            message:"Invalid token"
        })
    }
    //token check time
    if(userdetails.resetPasswordExpires < Date.now()){
        return res.json({
            success:false,
            message:"Token is expired ,please regenerate token"
                })
    }
    //hash the password
    const hashedpassword=await bcrypt.hash(password,10);
    //password update
   const updatedpassword =await user.findOneAndUpdate({
    token:token
   },
{
    password:hashedpassword
},{new:true}) 
    //return response
    return res.status(200).json({
        success:true,
        message:"Password  Reset Successfully!"
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error ocured while resetting",
            error:error.message
        })
    }
   
}

exports.resetpassword=resetpassword
exports.resetpasswordtoken=resetpasswordtoken