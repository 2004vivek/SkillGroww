import React, { useContext } from 'react'
import { CourseContext } from '../../context/CourseContext'

export default function YourCourses() {
    const { instructorcourse } = useContext(CourseContext);
    
    return (
        <div className="bg-slate-900 w-full p-4 rounded">
            <div className="text-white font-semibold lg:text-2xl md:text-[20px] text-[18px] ">Your Courses</div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-4">
                {instructorcourse?.map((coursedata, index) => (
                    <div key={index} className="text-white bg-slate-700 p-4 rounded-md shadow-lg">
                        <video 
                            src={coursedata?.thumbnails} 
                            alt="courseurl" 
                            className="w-full h-[250px] object-cover rounded-lg"
                        /> 
                        <div className="mt-4 font-bold  lg:text-[18px] md:text-[16px] text-[14px]">{coursedata?.coursename}</div>
                        
                        <div className="flex items-center justify-between text-white mt-2">
                            <span className="text-gray-300 lg:text-[18px] md:text-[16px] text-[14px]">{coursedata?.studentEnrolled?.length} Students</span>
                            <span className="text-yellow-400 font-bold lg:text-[20px] md:text-[16px] text-[14px]">Rs {coursedata?.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
