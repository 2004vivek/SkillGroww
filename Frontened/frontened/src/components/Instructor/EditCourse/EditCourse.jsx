import React, { useContext } from 'react'

import AddCourse from '../AddCourse.jsx/AddCourse'
import { CourseContext } from '../../../context/CourseContext'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
export default function EditCourse() {
    const {course,setcourse,setposition,setloader,loader,setcourseid}=useContext(CourseContext);
    const {courseid}=useParams();
    setcourseid(courseid)

    //fetching related coursedetails
    const fetchCourseDetails=async()=>{
        setloader(true)
        try {
            const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/getcoursedetails`,{courseid});
            console.log("this is course response",response.data.coursedetails)
            setcourse(response?.data?.coursedetails);
          } catch (error) {
            console.log(error?.response?.data||error.message)
          }
          finally{
            setloader(false);
          }
    }
    useEffect(() => {
      fetchCourseDetails()
      setposition(1);
    }, [courseid])
    
    console.log("this is courseid",courseid)
  return (
    <>
    {loader?<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">
      Loading...
    </div>: <div className=''>
        {course?<AddCourse/>:<div className='text-white'>No Course Found</div>}
        
    </div>}
   
    </>
  )
}
