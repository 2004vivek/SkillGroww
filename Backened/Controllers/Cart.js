
const Course=require("../Modals/Course");
const Cart=require("../Modals/Cart")
const mongoose=require('mongoose')
exports.addcartitem=async(req,res)=>{
    const {courseid}=req.body;
    const userid=req.user.id;
    try {
        //fetching the course
        const course=await Course.findById(courseid);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
          }

        //checking if any cart is associated with user or not
        let cart=await Cart.findOne({user:userid});

        if(!cart){
            cart=await Cart.create({user:userid,product:[courseid]})
            return res.status(201).json({ message: "Cart created and course added",cart:cart});
        }

        if(!cart.product.includes(courseid)){
            cart.product.push(courseid)
            await cart.save(); 
            return res.status(200).json({ message: "Course added to cart",cart:cart});
        }
        else{  
            //checking if the course is already in cart
        return res.status(400).json({ message: "Course already in cart" });
        }

        
       
   

    } catch (error) {
        res.status(500).json({ 
            success:false,
            error:error.message,
            message:"error while creating a cart"
        })
    }
}
exports.getallcart=async(req,res)=>{
    try {
        const userid=req.user.id;


        //checking if the user had something in cart or not
        let cart = await Cart.findOne({ user:userid }).populate({
            path: "product",
            populate: { path: "instructor" } 
        });
        console.log(cart)
        if(!cart){
            return res.status(400).json({
                success:true,
                message:"No Item in cart"
            });
        }
        else{
            return res.status(200).json({ 
                success:true,
                message:"Cart fetched Successsfully",
                cartitem:cart.product ,
                cartid:cart
            })
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"error while fetching the cart"
        })
    }
}
exports.deletecart=async(req,res)=>{
    try {
        const {courseid}=req.body;
        
        if(!courseid){
            return res.status(404).json({message:"No courses found with id"})
        }
      const updatedcourse= await Cart.findOneAndUpdate({ product: courseid },{$pull:{product:courseid}},{new:true}).exec();
      console.log("updatedcourese",updatedcourse)
      return res.status(200).json({
        updatedcourse:updatedcourse,
        message:'all the courses fetch from cart'
      })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while Deleting a course"
        })
    }
}