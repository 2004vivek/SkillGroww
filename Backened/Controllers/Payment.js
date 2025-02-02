const {instance}=require('../config/razorpay')
const Course=require('../Modals/Course')
const User=require('../Modals/User')
const {mailsender}=require('../utils/mailsender')

//capture the payment and initiate the razor pay
const capturepayment=async(req,res)=>{
    //get courseid and user id
    const {courseid}=req.body
    const userid=req.body.id
    //validation
    //valid courseid
    if(!courseid){
        return res.json({
            success:false,
            message:"please provide the valid course id"
        })
    }
    //valid coursedetails
    try {
        let coursedetails=await Course.findById(courseid)
        if(!courseid){
            return res.json({
                success:false,
                message:"couldnot find course"
            })
        }
          //user already pay for same course
          const uid=new mongoose.Types.ObjectId(userid)
          if(Course.studentEnrolled.includes(uid)){
            return res.status(200).json({
                success:true,
                message:"Student is already enrolled"
            })
          }
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }

    //order create
    const amount=Course.price;
    const currency="INR"
    const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseid:courseid,
            userid:userid

        }
    }
    try {
    //initate the payment by using razorpay 
    const paymentresponse=await instance.orders.create(options)
    console.log(paymentresponse)
    return res.status(200).json({
        success:true,
        amount:paymentresponse.amount,
        currency:paymentresponse.currency,
        coursename:Course.coursename,
        coursedescription:Course.coursedescription,
        orderid:paymentresponse.id

    })
    } catch (error) {
      return res.status(400).json({
        message:false,
        message:"couldnot initate payment"
      })
    }
}
//verify the signature of razorpay and server
exports.verifySignature=async(req,res)=>{
    //match karna hai wo secret joserver pe hai aur razor pay jo send karega wo secret 
    const websecret="123456789"

    const signature=req.headers("x-razorpay-signature");

   const hashedwebsecret= crypto.createHmac("sha256",websecret)
   hashedwebsecret.update(JSON.stringify(req.body))
   const digest=hashedwebsecret.digest("hex")
   if(signature===digest){
    console.log("Payment is Authorised")
 

   const {courseid,userid}=req.body.payload.entity.notes;

   try {
    //perform the action

    //find the course and enrolll in it
    const enrolledcourse=await Course.findByIdAndUpdate({_id:courseid,
    },{$push:{studentEnrolled:userid}},{new:true})
    if(!enrolledcourse){
        return res.status(500).json({
            success:true,
            message:"Course not found"
        })
    }
    // find the student and add the course to their enrolled course
    const enrolledstudent=await User.findByIdAndUpdate({_id:userid},{$push:{courses:courseid}},{new:true})
    console.log(enrolledstudent)


    //mail send karna
    await mailsender(enrolledstudent.email,"Congrulations from vivek","Congrulation you are onboarded to the course")
    return res.status(200).json({
        success:true,
        message:"Signature verified and course added"
    })
   } catch (error) {
    return res.status(500).json({
        success:false,
        error:error.message
    })
   }
}
     else{
        return res.status(400).json({
            success:false,
            message:"invalid signature"
        })
     }
}
exports.capturepayment=capturepayment