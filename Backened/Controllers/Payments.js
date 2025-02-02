const stripe = require("stripe")("sk_test_51QSifpEZj9co3L2BGyHY7nCra6SENwl9z5NwPewnhEwkO3hHxWSBH9kCLmRJi0SjluQc5vxXY2aaKllXg4d0bRAJ00SVDzvpcM");
const webhooksecret='whsec_iAUYEBLIiPqDVkJ3O33Ffv1c0T88CFy0'
const Course=require('../Modals/Course')
const User=require('../Modals/User')
const Cart=require('../Modals/Cart')
const mailsender=require('../utils/mailsender')
exports.orderCreate=async(req,res)=>{
    try {
      const {cartitem,discountamount,userid,cartitemid}=req.body;
      const courseids=cartitem?.map((course)=>{
        return (
          course._id
        )
      });
      const lineitem=cartitem.map((course)=>{
        
        return {
            price_data: {
              currency: 'inr',
              product_data: {
                name: course?.coursename,
                description: `Original Price: Rs. ${course.price}`,
                images: [course?.thumbnails?.replace('/video/upload/', '/video/upload/so_2s/').replace('.mp4', '.jpg')],
              },
              unit_amount: course?.price * 90, 
            },
            quantity: 1, 

          }; 
      })



        //checkout page creation
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineitem,
            mode: "payment",
            shipping_address_collection: {
              allowed_countries: ["US", "IN", "CA"],
            }, 
            metadata:{
              courseids:JSON.stringify(courseids),
              userid:userid?.toString(),
              cartitemid:cartitemid?.toString()
            },
            success_url: "http://localhost:5173/",
            cancel_url: "http://localhost:5173/"
          });

          return res.json({id:session.id})

    } catch (error) {
        console.log("this is eror",error)
        return res.status(500).json({
          message:false,
          message:"Error while creating an order",
          error:error.message 
        })
    }
}

//calling the strip webhook endpoint after the successfull payment
exports.verifySignature=async(req,res)=>{
    try {
        let event;
      
        const signature=req.headers['stripe-signature']
      
        if(webhooksecret){
            try {
                event=stripe.webhooks.constructEvent(req.body, signature, webhooksecret);
                console.log("this is request ki body",event)
            } catch (error) {
                console.log(`Webhook signature verification failed.`, error);
                return res.sendStatus(400);
            }
            switch (event.type) {
                case 'payment_intent.succeeded':
                  const paymentIntent = event.data.object;
                  console.log(`PaymentIntent for ${paymentIntent.price} was successful!`);  
                  break;
            
                case 'checkout.session.completed':
                  const session = event.data.object;
                  console.log(`Checkout session completed for session ID: ${session.id}`);

                  const courseid=JSON.parse(session.metadata.courseids)
                  const userids=session.metadata.userid
                  const cartid=session.metadata.cartitemid
                 

                //enrolling the user based on the course they purchased  
                for (const courseId of courseid) {
                    await EnrollUser(courseId,userids)                   
                }

                 //removing an item from a cart
                 if(cartid){
                   await RemoveCartItem(cartid)
                 }              

                  break;
            
                default:
                  console.log(`Unhandled event type ${event.type}.`);
              }
        }
        else{
            event=req.body
        }

        return res.status(200).send('Successfull verified secret key');

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error occcured while verifying signature",
            error:error.message
        })
    }
}

const EnrollUser=async(courseId,userids)=>{

  try {

    if(!userids||!courseId){
     throw new Error("No data found for this user or courseid")
    }

    //find the course and enroll a user to it
    const enrolledcourse=await Course.findByIdAndUpdate(courseId,{$push:{studentEnrolled:userids}},{new:true})

    if(!enrolledcourse){
      throw new Error("No course found");
    }

    //update the User schema in which user is enrolled to it
    const userenrolledcourses=await User.findByIdAndUpdate({_id:userids},{$push:{courses:courseId}},{new:true})

    //send a email
    await mailsender(userenrolledcourses.email,`Successfully Enrolled for ${enrolledcourse?.coursename}`,"You can view your Enrolled Courses in Enrolled COurse Page.Thank Your for Trust.Hoping a best for your carrier.")

    return{
      success:true,
      enrolledcourse:enrolledcourse,
      enrolledusercourse:userenrolledcourses,

    }
    
  } catch (error) {
    console.log("error hai bhai",error.message)
    return{
     
      message:"Error occured while Enrolling!",
      error:error.message
    }
  }

}

const RemoveCartItem=async(cartid)=>{
  try { 
    if(!cartid){
      throw new Error("No cart Found");
    }
    await Cart.findByIdAndDelete(cartid);
    return {
      success:true,
      message:"Cart item deleted successfully after course enrolled"
    }


  } catch (error) {
    return res.status(500).json({ 
      success:false, 
      message:"Error occured after deleting a cart after enrolled", 
      error:error.message
    }) 
  }
};