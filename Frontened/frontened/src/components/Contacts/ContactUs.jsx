import React, { useContext, useEffect } from 'react'
import { Appcontext } from '../../context/AppContext'
import { useForm } from 'react-hook-form'
export default function ContactUs() {
    const {loading}=useContext(Appcontext)
    const {reset,handleSubmit,register,formState:{errors,isSubmitSuccessful}}=useForm()

    useEffect(() => {
      if(isSubmitSuccessful){
        reset({
            firstname:"",
            lastname:"",
            phone:"",
            address:"",
            email:""
        })
      }
    }, [reset,isSubmitSuccessful])
    
    const submitContactForm=async(data)=>{
        console.log(data)

    }
  return (
    <>
    <div className=" w-full  flex justify-center items-center">
        <form action="" onSubmit={handleSubmit(submitContactForm)}>
            <div className='flex gap-4 flex-col md:flex-row'>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-white'>First Name:</label>
                    <input type="text" 
                    name="firstname"
                    className='bg-gray-800 p-[8px] text-white mt-1 rounded' 
                    {...register("firstname",{required:"First Name is Required",pattern: {value: /^[a-zA-Z\s]+$/, message: "First Name must contain only alphabets", },})}
                    placeholder='Enter The First Name'/>
                    {errors.firstname&& <span className='text-red-600 text-sm mt-1'><sup>*</sup>{errors.firstname.message}</span>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-white'>Last Name:</label>
                    <input type="text" className='bg-gray-800 p-[8px] text-white mt-1 rounded' placeholder='Enter The Last Name' {...register("lastname",{required:"Last Name is Required",pattern:{value: /^[a-zA-Z\s]+$/, message: "Last Name must contain only alphabets", }})}/>
                    {
                        errors.lastname&&<span className='text-red-600 text-sm mt-1'><sup>*</sup>{errors.lastname.message}</span>
                    }
                </div>
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="" className='text-white'>Email Address:</label>
                <input type="email" className='bg-gray-800 p-[8px] text-white mt-1 rounded'  placeholder='Enter The Email Address' {...register("email",{required:"Email Address is Required", pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address",},})}/>
                {
                    errors.email&& <span className='text-red-600 text-sm mt-1'><sup>*</sup>{errors.email.message}</span>
                }
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="" className='text-white'>Phone Number:</label>
                <input type="tel" name='phone' className='bg-gray-800 p-[8px] text-white mt-1 rounded' placeholder='Enter The Phone Number' {...register("phone", {required:"Phone Number is required",maxLength:{value:10 ,message:"Invalid Phone Number"}})}/>
                {
                    errors.phone&& <span  className='text-red-600 text-sm mt-1'>{errors.phone.message}</span>
                }

            </div>
            <div className='flex flex-col  mt-4'>
                <label htmlFor="" className='text-white'>Message:</label>
                <textarea name="address" id="" className='bg-gray-800 mt-1 text-white' cols="35" rows="5" placeholder='Enter Your Message Here' {...register("address",{required:true})}></textarea>
                {
                    errors.address&&  <span className='text-red-600 text-sm mt-1'><sup>*</sup>Please Enter an message</span>
                }
            </div>
            <div><button type='submit' className='bg-yellow-400 mt-4 p-2 rounded-md cursor-pointer font-bold' >Send Message</button></div>

        </form>
 
</div>
</>
  )
}
