import React, { useState } from 'react'
import ColorButton from '../CoreComponent/ColorButton'
import homeexplorerdata from '../../../data/homeexplorerdata'
import CourseCard from './CourseCard'
export default function HomePageExplorer() {
    const [currenttag,setcurrenttag]=useState(homeexplorerdata[0].tag)
    const [coursedata,setcoursedata]=useState(homeexplorerdata[0].courses)
    const [currentcard,setcurrentcard]=useState(homeexplorerdata[0].heading)
    // console.log(coursedata)
  
    function TagShufflerHandler(data){
        setcurrenttag(data)
        const result=homeexplorerdata.filter((course)=>data===course.tag)
        setcoursedata(result[0].courses);
        setcurrentcard(result[0].courses.heading)
        console.log("this is course",result[0].courses);

    }
  return (
    <div className='mt-5 w-full'>
      <h3 className='md:text-2xl text-[20px] xl:text-3xl text-center font-bold text-white'>Unlock the <ColorButton text={"Power Of Code"}></ColorButton></h3>
      <p className='text-slate-400 text-center mt-2 text-[14px] md:text-[16px]'>Learn to build anything which you can imagine</p>
      <div className='flex bg-slate-800 h-[50px] md:max-w-[70%] w-[90%]  justify-center items-center m-auto rounded-full overflow-hidden mt-4'>
        {
            homeexplorerdata.map((data,index)=>{
                return (
                    <div key={index} className={`text-white text-[12px] md:text-[16px] xl:text-[16px] h-[80%]  flex justify-center items-center w-[50%] ${index==0&&"ml-2"} ${index==4&&"mr-2"} ${currenttag===data.tag?"bg-black  rounded-full":"bg-slate-800"} transition-all duration-200 cursor-pointer`} onClick={()=>TagShufflerHandler(data.tag)}>{data.tag}</div>
                )
            })
        }
      </div>

      <div className='w-[90%] mt-4  flex-col md:flex-row m-auto  flex gap-10 justify-center items-center'>
        {
            coursedata.map((course,index)=>{
                return (
                    <CourseCard key={index} course={course} currentcard={currentcard} />
                )
            })
        }
       
      </div>

    </div>
  )
}
