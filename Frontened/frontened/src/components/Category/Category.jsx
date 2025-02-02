import React, { useContext, useEffect } from 'react'
import Navbar from '../CoreComponent/Navbar'
import Footer from '../CoreComponent/Footer'
import { CourseContext } from '../../context/CourseContext'
import CourseSlider from './CourseSlider'
import CourseCard from './CourseCard'
import axios from 'axios'
export default function Category() {
    const {allcategory,setallcategory,differentcategory,setdifferentcategory,topcategory,settopcategory,loader}=useContext(CourseContext);

    console.log("this is top category",topcategory)
    console.log("this is all category",allcategory)
    console.log("this is different category",differentcategory)
    // useEffect(()=>{
    //     getAverageRating();
    // },[])

    // const getAverageRating=async()=>{

    //     try {
    //         const courseIds = allcategory?.course?.map(course => course._id) || [];
    //         console.log("this is courseid",courseIds)
    //         const rating=await axios.post("http://localhost:3000/api/v1/course/averagerating",
    //             {}
    //         )
    //     } catch (error) {
            
    //     }
    // }

  return (
    <>
   {loader?(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">
      Loading...
    </div>
    ):
    <>
    <Navbar/>
    <div className='text-white w-full bg-slate-800'>
        <div className='w-[85%] m-auto space-y-3 mt-4 py-4'>
            <p className='font-bold'>Home / Category / <span className='text-yellow-400'>{allcategory?.name}</span></p>
            <p className='text-2xl font-bold'>{allcategory?.name}</p>
            <p>{allcategory?.description}</p>
        </div>
    
    </div >
    <div  className='w-[85%] m-auto mt-4'>
        <div className='text-yellow-500 text-2xl font-bold'>Courses to get you started</div>

        {/* selected course */}
        <div>
            <CourseSlider course={allcategory?.course}></CourseSlider>
        </div>

        {/* top Courses */}
        <div>
        <div className='text-yellow-500 text-2xl font-bold mt-10'>Top Categories</div>

        <CourseSlider course={topcategory?.course}></CourseSlider>
        </div>

        {/* Different Courses */}
        <div>
        <div className=' text-2xl font-bold mt-10 text-yellow-500'>More Categories</div>
        {
            differentcategory?.map((course)=>(
                // console.log("this is course",course.course)
                <CourseCard course={course?.course}></CourseCard>
            ))
        }
        </div>
    </div>
    <Footer/>
    </>
    }
    </>
  )
}
