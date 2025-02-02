// const user=require("../Modals/User")
const Otp=require("../Modals/Otp")
const otpGenerator=require('otp-generator')
const bcrypt=require('bcrypt')
const User = require("../Modals/User")
const Profile=require('../Modals/Profile')
require("dotenv").config()
const jwt=require("jsonwebtoken")
const mailsender=require('../utils/mailsender')
//sendotp
const sendotp=async(req,res)=>{
    try {
    //fetching email from req ki body
    const {email}=req.body
    console.log("this is the emails ",email)
    //check if the user exist
    const checkinguser=await User.findOne({email})
    if(checkinguser){
        return res.status(401).json("User already exists")
    }
    //generate otp
    const otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    })
    console.log("otpppp",otp)

    //check unique otp or not 
    const checkingotp=await Otp.findOne({otp})
    while(checkingotp){
        otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        checkingotp=await Otp.findOne({otp})
    }
    //create an entry in database
    const storingotp=await Otp.create({email,otp})
    return res.status(200).json({
        succcess:true,
        otp:storingotp,
        message:"otp sent successfully!"
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while sending a otp"

        })
    }
   

}
//signup
const signup=async(req,res)=>{
    try {
        const {firstName, lastName,email,password,confirmpassword,otp,role,Phone}=req.body


        //validate 
        if(!firstName||!lastName||!email||!password||!confirmpassword||!otp){
            return res.status(403).json("All Fields are required")
        }
        //2 password match
        if(password!==confirmpassword){
            return res.status(400).json({
                message:"Password doesnot match ,Try again"
            })
        }
        //checking user exist or not
        const existuser=await User.findOne({email});
        if(existuser){
            return res.status(400).json({
                success:false,
                message:"User is already registered"
            })
        }

        //find most recent otp stored for user
        const recentotp=await Otp.findOne({email}).sort({createdAt:-1}).limit(1)
        if (!recentotp) {
            return res.status(400).json({
                success: false,
                message: "OTP not found for the provided email",
            });
        }
        else if(recentotp.otp!==otp){
            return res.status(400).json({
                message:"Invalid otp"
            })
        }
        // else{
        //     return res.status(200).json({
        //         message:"Correct otp"
        //     }) 
        // }
        //hash password
        const hashedpassword=await bcrypt.hash(password,10)

        const profile=await Profile.create({
            dob:null,
            about:null,
            gender:null,
            proffession:null,
            phoneNumber:null
           
        })
        const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedpassword,
            confirmpassword:hashedpassword,
            role,
            additionalDetails:profile._id,
            image:`https://ui-avatars.com/api/?name=${firstName}${lastName}`
        })
        return res.status(200).json({
            success:true,
            message:"user is registered successfully"
        })


    } catch (error) {
        return res.status(500).json({
            succcess:false,
            message:"user is not registered",
            error:error.message
        })
    }
}


//login
const login=async(req,res)=>{
    try {
        //get data from req ki body
        const {email,password}=req.body
        //validation
        if(!email||!password){
            return res.status(403).success({
                success:false,
                message:"All fields are required"
            })
        }
        //checking the existence of the user or not
        const existinguser=await User.findOne({email})
        if(!existinguser){
            return res.status(404).json({
                success:false,
                message:"User doesnot exists"
            })
        }
        //match password and generate token
        
        if(await bcrypt.compare(password,existinguser.password)){
            const payload={
                name:existinguser.email,
                role:existinguser.role,
                id:existinguser._id
                
            }
            const token=jwt.sign(payload,process.env.SECERT_KEY,{
                expiresIn:"3h"
            })
            const option={
                expiresIn:new Date(Date.now()+3*34*60*60*1000),
                httpOnly:true
            }
      

            return res.cookie("cookie",token,option).status(200).json({
                success:true,
                token:token,
                user:existinguser,
                message:"logged in successfully"
            })

        }
        else{
            return res.status(401).json({
                succcess:false,
                message:"Please enter the correct password"
            })
        }
       
        
        //create cookies
    } catch (error) {
       return res.status(500).json({
        success:false,
        message:"error while login,try again",
        error:error.message
       }) 
    }
}
//changepassword 
const changepassword=async(req,res)=>{
    try {
         //get the data from req body
    //get the new password,confirmnewpassword
    const {oldpassword,newpassword,email}=req.body
    //validation
    if(!oldpassword||!newpassword){
        return res.status(400).json({message:'Please fill in all fields.'});
    }
    // if(newpassword!==confirmpassword){
    //     return res.status(400).json({message: 'New password and confirm password do not match.'});
    // }
    const checkinguser=await User.findOne({email})
    console.log(checkinguser)
    if(!checkinguser){
        return res.status(404).json({
            success:false,
            error:error.message,
            message:"User with email doesnot found"
        })
    }
      //update pwd in Db
    if(await bcrypt.compare(oldpassword,checkinguser.password)){
        const hashedpassword=await bcrypt.hash(newpassword,10)
        checkinguser.password=hashedpassword
        await checkinguser.save()
         //sendmail--password updated
    await mailsender(checkinguser.email,"Password Update","Password Updated Successfully") 
    return res.status(200).json({
        success:true,
        // error:error.message,
        message:"Password Successfully Updated"
    })
    }
    else{
        return res.status(401).json({
            success:false,
            message:"Password donot match"
        })
    }
   
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error occured while changing the password "
            ,error:error.message
        })
    }
   

}
exports.sendotp=sendotp
exports.signup=signup
exports.login=login
exports.changepassword=changepassword