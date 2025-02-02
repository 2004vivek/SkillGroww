import React, { useContext, useEffect, useState } from 'react'
import { CourseContext } from '../../context/CourseContext'
import { IoShareSocial } from "react-icons/io5";
import copy from 'copy-to-clipboard';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';
export default function CourseDetailsCard({coursedata}) {
  const {AddtoCart,loader,discountprice,setdiscountprice,settotalprice,setcartitem}=useContext(CourseContext)


  const cartitem=[coursedata];
  console.log("this is cpoursed data",cartitem)
 
    const location=useLocation();
    const userdetails=JSON.parse(localStorage.getItem("usertype"))
    const userid=userdetails._id;
    const pathname="http://localhost:5173"+location.pathname;
    const shareHandler=()=>{
        copy(pathname);
        toast.success("Copied to Clipboard")
    }

    const navigate=useNavigate()

    //handling buy now
    useEffect(()=>{
      let totalprice=cartitem?.reduce((sum,product)=>{
        return sum+parseInt(product?.price)
      },0)
      settotalprice(totalprice)
  
      const totaldiscountprice = cartitem?.reduce((total, product) => {
        const discountprice = parseInt(product?.price) - (product?.price *10) / 100;
        return total + discountprice;
      }, 0);
  
      setdiscountprice(totaldiscountprice)
  
    },[cartitem])
  
  
    //intialise the payment
    const handleBuyNow=async()=>{
      console.log("rfdkml")
    
      try {
        const stripe = await loadStripe("pk_test_51QSifpEZj9co3L2BbdcWAV8hYQoauxstmYUoTk1c2qsXoB1jhMDM5aix7ymmLGwQ4cgLQhG23ZlVPXDpqCJvenSP00vU5n6CpL");
  
        const response=await axios.post("https://skillgroww.onrender.com/api/v1/payment/transaction",
        {cartitem:cartitem,discountprice:discountprice,userid:userid,cartitemid:''}
          
        )
        console.log("this is error while stripe redirect",response)
        const result=stripe.redirectToCheckout({ 
          sessionId:response.data.id
        })
       if(result.error){
        console.log("stripe redirect error",result.error)
       }      
      } catch (error) {
        console.log("this is error while opening checkout page",error?.response?.data||error?.message)
        toast.success(error?.response?.data||error?.message)
      }
    }


  return (
    <div className='bg-slate-800 p-5 rounded-lg '>
      <div className='w-[270px] h-[250px] '>
        <video src={coursedata?.thumbnails} alt="courseimg"  className='h-full w-full object-cover rounded-lg'/>
      </div>
      <div className='mt-2 text-3xl font-bold'>
        Rs. {coursedata?.price}
      </div>

      <div className='flex flex-col gap-3 mt-2'>
    <button className='bg-yellow-500 py-2 rounded-lg text-black font-bold' onClick={coursedata?.studentEnrolled?.some(student=>student._id===userid)?()=>navigate(`/dashboard/enrolled-course/${userid}`):handleBuyNow}>
        {coursedata?.studentEnrolled?.some(student=>student._id===userid)?"Go To Course":"Buy Now"}
    </button>

    {!coursedata?.studentEnrolled?.some((student)=>student._id==userid)&&
     <button className='bg-gray-700 py-2 rounded-lg font-bold' onClick={()=>AddtoCart(coursedata?._id)}>

     {loader?"Adding....":"Add to Cart"}
 </button>
    }
   
      </div>
      <div className='text-center mt-2'>Refund of <span className='text-yellow-400'>90% </span>in 90 days</div>
      <div className='mt-4'>
        <p className='font-semibold'>This Course Include : </p>
        {coursedata?.instruction?.map((data)=>(
            <li className='ml-2 mt-1'>{data}</li>
        ))}
      </div>
      <div className='mt-3 flex justify-center items-center gap-1 cursor-pointer' onClick={shareHandler}>
        <span><IoShareSocial color='yellow'/></span><span className='text-yellow-300 font-semibold' >Share</span>
      </div>
    </div>
  )
}
