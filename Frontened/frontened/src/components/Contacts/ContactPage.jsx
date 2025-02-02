import React from 'react'
import Navbar from '../CoreComponent/Navbar'
import ContactUs from './ContactUs'
import { IoMdChatboxes } from "react-icons/io";
import { FaGlobeAfrica } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Footer from '../CoreComponent/Footer';
export default function ContactPage() {
  return (
    <>
    <Navbar/>
    <div className=' w-[90%] m-auto flex justify-around items-center mt-4 flex-wrap'>
      <div className=''>
        <div className='lg:w-[350px] w-full min-h-fit bg-slate-900 flex flex-col gap-5 mb-4 lg:m-0 p-5 rounded-md'>
            <div><div className='flex items-center'><span className='mr-1'><IoMdChatboxes color='white' fontSize="18px"/> </span><span className='text-white text-xl '>Chat on us</span></div><p className='text-slate-500'>Our friendly teamis here to help info@studygrow.com</p></div>
            <div><div className='flex items-center'><span className='mr-1'><FaGlobeAfrica color='white' fontSize="18px"/></span><span className='text-white text-xl'>Visit Us</span></div>
            <p className='text-slate-500'>Come and say hello to at our office.Aditya Univerisity,Surampalem,Andhra Pradesh</p>
            </div>
            <div><div className='flex items-center'><span className='mr-1'><FaPhoneAlt color='white' fontSize="18px"/></span><span className='text-white text-xl'>Call us</span></div><p className='text-slate-500'>Mon-Sat from 9am to 9pm </p><p className='text-slate-500'>+123 456 789</p></div>
        </div>
      </div>
      <div className='border border-slate-800 rounded-md px-2 py-3 '>
       <div><h3 className='font-semibold text-white text-2xl w-[85%] m-auto mb-4'>Got a Idea? We've got the skills.Let's team up</h3></div> 
        <p className='text-slate-400 text-center mb-4'>Tell us more about yourself and what you're got in mind.</p>
        <ContactUs/>
      </div>
    </div>
    <Footer/>
    </>
  )
}
