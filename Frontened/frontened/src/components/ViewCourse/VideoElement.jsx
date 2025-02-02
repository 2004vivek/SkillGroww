import React, { useRef, useState } from 'react'
import { useContext } from 'react';
import { CourseContext } from '../../context/CourseContext';
import ReactPlayer from 'react-player'
import { FaPlayCircle } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
export default function VideoElement() {
     const {coursedata,setcoursedata,videopreview,markcompleted,setmarkcompleted,rewatch,setrewatch,completedsubsectionid,setcompletedsubsectionid,setcompletedvideo}=useContext(CourseContext);     

     let playerposition=useRef(null);
     

     console.log("this is subsectionid",completedsubsectionid)
    

     const MarkCompleteHandler=async()=>{
      try {
        let response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/courseprogress/course-progress`,
          {
            courseid:coursedata._id,
            subsectionid:completedsubsectionid
          }
        )
        console.log(response?.data?.completedlecture)
        toast.success(response?.data?.message)
        setmarkcompleted(false);
        setcompletedvideo((prev)=>Array.isArray(prev)?[...prev,completedsubsectionid]:[completedsubsectionid])
        setrewatch(false)
      } catch (error) {
        console.log("errorrr!",error?.response?.data||error?.message)
        toast.error(error?.response?.data?.message||error?.message)
      }
     }
     
  return (
    <div className='relative w-[1250px] h-[500px]'>
      <ReactPlayer 
        url={videopreview} 
        ref={playerposition}
        controls 
        width="100%" 
        height="100%" 
        onEnded={()=>{setmarkcompleted(true);setrewatch(true)}}
        onPlay={()=>{setmarkcompleted(false);setrewatch(false)}}
        light={true}  
        
        playIcon={
          <div className="absolute inset-0 flex items-center justify-center">
            <FaPlayCircle size={80} color="yellow"/>
          </div>
        }
      />
      {/* <div>{coursedata?.coursename}</div>
      <div>{coursedata?.coursedescription}</div> */}
      {markcompleted&&
      <div className='absolute top-[50%] left-[50%] z-40 text-white bg-yellow-600 rounded-md p-2 cursor-pointer font-bold' onClick={MarkCompleteHandler}>Mark As Completed</div>
      }
        {rewatch&&
      <div className='absolute top-[40%] left-[53%] z-40 text-white bg-yellow-600 rounded-md p-2 cursor-pointer font-bold' onClick={()=>{playerposition.current.seekTo(0);setmarkcompleted(false);setrewatch(false)}}>Rewatch</div>
      }
    </div>
  )
}
