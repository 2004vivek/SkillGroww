import React, { useContext } from 'react'
import Navbar from '../CoreComponent/Navbar'
import { Outlet } from 'react-router-dom'
import SidebarVideoDetails from './SidebarVideoDetails'
import VideoElement from './VideoElement'
import { CourseContext } from '../../context/CourseContext'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
export default function ViewCourse() {
  const {loader,setloader,videopreview,setvideopreview,coursedata,setcoursedata,completedvideo,setcompletedvideo,totalsubsection,settotalsubsection}=useContext(CourseContext);

  const {id}=useParams();

   //fetching course details
      const fetchingCourseDetails=async()=>{
          try {
            setloader(true)
               const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/getcoursedetails`,{
                  courseid:id
                })
                console.log("this is course details",response?.data);
                setcoursedata(response?.data?.coursedetails);
                setcompletedvideo(response?.data?.completedvideoes)
          } catch (error) {
              console.log("error while fetching the course details",error?.response?.data||error?.message)
          }
          finally{
            setloader(false)
          }
      }
  
      useEffect(()=>{
          fetchingCourseDetails()
      },[id])



     useEffect(()=>{
        let lecture=0;
        coursedata?.coursecontent?.forEach(section => {
            lecture=lecture+section?.subsection?.length||0
        });
    settotalsubsection(lecture)
    },[coursedata])
    
  return (
    <>
    <Navbar/>
    <div className='w-full border flex'>
      {loader?<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">Loading...</div>:
      <>
          <div className='min-h-[85vh] flex '>
          <SidebarVideoDetails totalsubsection={totalsubsection}/>
          {/* <div className='w-[calc(100vw-3rem)] border overflow-auto'>
              <div className='w-11/12 mx-auto max-w-[1000px] py-10'>
              <Outlet/>
              </div>
              </div> */}
      </div>
      <div className='w-full flex justify-center items-center'><VideoElement></VideoElement></div>
      </>
      
      }

    </div>
    </>
  )
}
