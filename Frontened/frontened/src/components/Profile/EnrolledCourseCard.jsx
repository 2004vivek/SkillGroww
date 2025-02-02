import React, { useContext } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';
import { CourseContext } from '../../context/CourseContext';
export default function EnrolledCourseCard({course}) {
  const navigate=useNavigate()

  const {completedvideo,totalsubsection}=useContext(CourseContext)

  const completedCount = completedvideo?.length || 0;
  const totalCount = totalsubsection || 1; 
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className='flex w-full my-4 cursor-pointer mb-10 border-b-gray-800 border-b-[0.2px] py-3 hover:bg-slate-900 px-4 rounded-md' onClick={()=>navigate(`/viewcourse/${course._id}/`)}>
      <div className='w-[60%] flex text-[16px] font-bold'>
        <div className='h-[64px] w-[120px] rounded-lg overflow-hidden'>
            <video src={course?.thumbnails} alt="course" className='w-full h-full '/>
        </div>
        <div className='w-[90%] ml-5'>
            <div className='text-[18px] font-bold text-white'>{course?.coursename}</div>
            <div className='text-[14px] font-medium text-slate-400'>
            {course?.coursedescription?.length > 50 
            ? course?.coursedescription.slice(0, 35) + "..." 
            : course?.coursedescription}</div>
        </div>
      </div>
      <div className='w-[50%] text-[16px] font-bold py-2 text-white'>
        {course?.timeduration}
      </div>
      <div className='w-[50%] py-2 flex flex-col justify-center '>
        <p className=' text-[14px] font-bold text-gray-400'>Progress: {course?.coursecompletedprogress||0}%</p>
      <ProgressBar completed={course?.coursecompletedprogress} height='14px' width='80%'  bgColor='rgb(50, 210, 230)' labelAlignment='center' isLabelVisible={false}/>
      </div>
    </div>
  )
}
