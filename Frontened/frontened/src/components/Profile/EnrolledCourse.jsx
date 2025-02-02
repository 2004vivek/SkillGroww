import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import EnrolledCourseCard from './EnrolledCourseCard'
import { Appcontext } from '../../context/AppContext'
export default function EnrolledCourse() {

  const [enrolledcourse,setenrolledcourse]=useState(null)
  const {loading,setloading}=useContext(Appcontext)
  const getEnrolledCourses=async()=>{
    try {
      const token=localStorage.getItem("token")
      const user=JSON.parse(localStorage.getItem("usertype"))
      const userid=user._id;
      setloading(true)
      const response=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/profile/get-enrolled-courses/${userid}`,
        {
          headers:{
            "Authorization":`Bearer ${token}`
          }
        }
      )
      console.log("this is reponse",response?.data)
      setenrolledcourse(response?.data?.userdetails);
    } catch (error) {
      console.log(error?.response?.data||error?.message)
    }
    finally{
      setloading(false)
    }
  }

  useEffect(() => {
   getEnrolledCourses()
  }, [])
  
  return (
    <div className='text-white text-2xl w-full m-auto '>
        <h3 className='text-white lg:text-3xl font-bold '>Enrolled Courses</h3>
        {
          loading?(<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">Loading...</div>):(
          <>
          {
            enrolledcourse?.length===0?(<div className='mt-6'>No course is enrolled</div>):
            (
              <>
              <div className='w-full flex mt-6 bg-gray-400/20 px-4 rounded'>
              <div className='w-[60%] text-[16px] font-bold py-2'>Course Name</div>
              <div className='w-1/2 text-[16px] font-bold py-2'>Duration</div>
              <div className='w-1/2  text-[16px] font-bold py-2'>Progress Bar</div>
            </div>
             <div className='w-full mt-4'>
              {
                enrolledcourse?.map((course,index)=>{
                  return <EnrolledCourseCard key={index} course={course}/>
                })
              }
             </div>
              </>
            )
          }
          </>)
        }
       
       
      
    </div>
  )
}
