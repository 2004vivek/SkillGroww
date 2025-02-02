import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import CartCard from './CartCard'
import { Appcontext } from '../../context/AppContext'
import { CourseContext } from '../../context/CourseContext'
import { loadStripe } from '@stripe/stripe-js'
export default function Cart() {
  const userdetails=JSON.parse(localStorage.getItem("usertype"))
  const userid=userdetails._id;
  const token=localStorage.getItem("token")

  const [cartid,setcartid]=useState('');
 
  const {cartitem,setcartitem,settotalprice,totalprice,discountprice,setdiscountprice,loader,setloader}=useContext(CourseContext);

  let baseurl=import.meta.env.VITE_API_BASE_URL

  console.log("this is env",import.meta.env.VITE_API_BASE_URL)

  const getallcart=async()=>{

    try {
      setloader(true)
      const response=await axios.get(`${baseurl}/api/v1/cart/get-all-cart`,
        {
          headers:{
            "Authorization":`Bearer ${token}`
          }
        }
      )

      console.log("this is all cart item",response.data.cartitem);
      setcartid(response.data.cartid._id)
      setcartitem(response.data.cartitem)

    } catch (error) {
      console.log("this is error",error?.response?.data||error?.message) 
    }
    finally{
      setloader(false)
    }
  }
  useEffect(()=>{    
      getallcart()

  },[])

  useEffect(()=>{
    let totalprice=cartitem.reduce((sum,product)=>{
      return sum+parseInt(product.price)
    },0)
    settotalprice(totalprice)

    const totaldiscountprice = cartitem.reduce((total, product) => {
      const discountprice = parseInt(product.price) - (product.price *10) / 100;
      return total + discountprice;
    }, 0);

    setdiscountprice(totaldiscountprice)

  },[cartitem])


  const {loading}=useContext(Appcontext);

  //intialise the payment
  const handlePayment=async()=>{
    try {
      const stripe = await loadStripe("pk_test_51QSifpEZj9co3L2BbdcWAV8hYQoauxstmYUoTk1c2qsXoB1jhMDM5aix7ymmLGwQ4cgLQhG23ZlVPXDpqCJvenSP00vU5n6CpL");

      const response=await axios.post("https://a28f-2409-40f0-103e-d2ba-f5fe-df77-96bd-cdbf.ngrok-free.app/api/v1/payment/transaction",
      {cartitem:cartitem,discountprice:discountprice,userid:userid,cartitemid:cartid}
        
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
    <div className='text-white text-2xl w-full m-auto '>
           <h3 className='text-white lg:text-3xl font-bold'>My Cart</h3>
           {
             loader?(<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">Loading...</div>):(
             <>
             {
               cartitem?.length===0?(<div><div className='mt-6 text-white'>No item in a cart</div>
               {/* <div className='text-yellow-400 text-[16px]  bg-slate-800 w-fit mt-4 py-1 px-2 rounded-lg font-bold cursor-pointer'>Continue Exploring</div> */}
               </div>):
               (
                 <>
                 <div className='text-[22px] mt-4 text-slate-400'>{cartitem?.length||0} courses in cart</div>

                 <div className='w-full flex'>
                <div className='w-[75%] border-2 border-yellow-200 mt-4'>
                 {
                   cartitem?.map((cart,index)=>{
                     return <CartCard key={index} cart={cart}/>
                   })
                 }
                </div>
                <div className="w-[25%] h-[250px]  border-dashed border bg-gray-900 border-slate-500 mt-4 rounded-md ml-3 p-4">
                  <div className='text-[18px] text-slate-400'>Total:</div>
                  <div className='texxt-[22px] text-yellow-500 font-bold'>Rs. {discountprice}</div>
                  <div className='text-[16px] text-slate-400 line-through'>Rs. {totalprice}</div>
                  <button className='w-[96%] py-1 rounded-md mt-6 mx-auto bg-yellow-400 text-black font-bold text-[18px]' onClick={handlePayment}>Pay Now</button>
                </div>
                </div>
                 </>
               )
             }
             </>)
           }
       </div>
  )
}
