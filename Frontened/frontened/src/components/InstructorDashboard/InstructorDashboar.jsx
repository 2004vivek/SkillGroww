import React, { useContext, useEffect } from 'react'
import Chart from './Chart'
import YourCourses from './YourCourses'
import axios from 'axios'
import { CourseContext } from '../../context/CourseContext'
export default function InstructorDashboard() {
    let userdetails=JSON.parse((localStorage.getItem("usertype")))

    const token=localStorage.getItem("token");
    
    const {instructorcourse,setinstructorcourse,totalcourse,settotalcourse,totalenrolled,settotalenrolled,instructortotalrevenue,setinstructortotalrevenue,loader,setloader}=useContext(CourseContext)



    const fetchInstructorDashboard=async()=>{
        
        try {
          setloader(true)
            const response=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/profile/instructor-dashboard`,
                {
                    headers: {
                      Authorization:`Bearer ${token}`,
                    },
                  }
            )

            console.log("this is response",response?.data?.totalcourses
            )
            setinstructorcourse(response?.data?.Courses)
            settotalcourse(response?.data?.totalcourses)
            settotalenrolled(response?.data?.totalstudent)
            setinstructortotalrevenue(response?.data?.totalamountrecieve)
        } catch (error) {
            console.error(error?.response?.data||error?.message)
        }
        finally{
          setloader(false)
        }
    }
    useEffect(()=>{
        fetchInstructorDashboard()
    },[])
  return (
    <>
    {loader?<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">
      Loading...
    </div>:
     <div className='text-white'>
     <p className='lg:text-3xl md:text-[20px] text-[18px] font-bold'>Hi {userdetails?.firstName?.toUpperCase()} {userdetails?.lastName.toUpperCase()} <span className='text-[24px]'>👋</span></p>
     <p className='text-gray-500 mt-4 lg:text-[18px] text-[16px]'>Let's start something new </p>
     <Chart enrolledcourse={instructorcourse} totalamountrecieve={instructortotalrevenue} totalcourses={totalcourse} totalstudent={totalenrolled}></Chart>
     <div>
       <YourCourses></YourCourses>
     </div>
   </div> 
    }
   
    </>
  )
}