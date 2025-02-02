import React from 'react'
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
export default function CourseCard({course}) {
  return (
    <div className='h-[250px] w-[250px] z-50 relative bg-gray-900 p-3'>
      <h3 className='text-white text-xl mb-2'>{course.heading}</h3>
      <p className='text-slate-400 text-[14px] md:text-[16px]'>{course.description}</p>
      <div className='absolute  left-[50%] translate-x-[-50%] translate-y-[-50%] bottom-1 flex w-[90%] m-auto justify-between h-[20px] '>
        <div className='text-slate-400 flex items-center gap-1 text-[14px]'><IoPeopleSharp />{course.level}</div>
        <div className='text-slate-400 flex items-center gap-1 text-[14px]'><MdOutlineSlowMotionVideo />{course.lessionNumber} <span>Lessons</span></div>
      </div>
    </div>
  )
}
