import React from 'react'
import { IoAddSharp } from "react-icons/io5";
import CourseCard from './CourseCard'
import { useNavigate } from 'react-router-dom';
export default function MyCourse() {

  const navigate=useNavigate();
  return (
    <div className='w-full'>
      <div className='flex justify-between'>
      <h3 className='text-white lg:text-3xl font-bold'>My Course</h3>
      <button className='bg-yellow-500 font-bold rounded-lg px-2 flex items-center gap-1' type='button' onClick={()=>{navigate("/dashboard/add-courses");console.log("clicked")}}>Add Course <IoAddSharp fontSize="18px" fontWeight="bold"/></button>
      </div>
       
        <div className='w-full flex border mt-4'>
            <div className='w-[70%] border text-slate-400 font-semibold'>COURSE</div>
            <div className='w-[20%] border text-slate-400 font-semibold'>DURATION</div>
            <div className='w-[20%] border text-slate-400 font-semibold'>PRICE</div>
            <div className='w-[20%] border text-slate-400 font-semibold'>ACTIONS</div>
        </div>
        <CourseCard/>
    </div>
  )
}
