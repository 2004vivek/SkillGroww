import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../CoreComponent/Navbar';
import Footer from '../CoreComponent/Footer';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import Formatdate from '../CoreComponent/Formatdate';
import { CiCircleInfo } from "react-icons/ci";
import CourseDetailsCard from './CourseDetailsCard';
import { CiGlobe } from "react-icons/ci";
import { CourseContext } from '../../context/CourseContext';
import { BiVideo } from "react-icons/bi";
import { IoChevronDown } from "react-icons/io5";
export default function CourseDetails() {
    const {id}=useParams();

    const {coursedata,setcoursedata}=useContext(CourseContext);

    const [visiblesubssection,setvisiblesubsection]=useState(false);

    const [totalsubsection,settotalsubsection]=useState(0);
    console.log("this is coursedata",coursedata?.instructor?.firstName)

    useEffect(()=>{
                let lecture=0;
                coursedata?.coursecontent?.forEach(section => {
                    lecture=lecture+section?.subsection?.length||0
                });
            settotalsubsection(lecture)
    },[coursedata])

    // const [totalnooflecture,setnooflecture]=useState(0);

    // useEffect(()=>{
    //     let lecture=0;
    //     coursedata?.coursecontent?.forEach(section => {
    //         lecture=lecture+section?.subsection?.length||0
    //     });
    //     setnooflecture(lecture)
    // },[coursedata])

    const fetchingCourseDetails=async()=>{
        try {
             const response=await axios.post(`http://localhost:3000/api/v1/course/getcoursedetails`,{
                courseid:id
              })
              console.log("this is course details",response?.data);
              setcoursedata(response?.data?.coursedetails);
        } catch (error) {
            console.log("error while fetching the course details",error?.response?.data||error?.message)
        }
    }

    useEffect(()=>{
        fetchingCourseDetails()
    },[id])

    const showHideSubsectionHandler=(index)=>{
        setvisiblesubsection((prev)=>prev===index?null:index)
    }


  return (
    <>
    <Navbar/>
    <div className='text-white w-[85%] m-auto mt-10'>
      <div className='flex justify-between'>
        <div className='w-[70%]  h-fit'>
            <h3 className='text-4xl font-bold'>{coursedata?.coursename}</h3>
            <p className='text-slate-400 mt-2'>{coursedata?.coursedescription}</p>
            <p className='flex items-center gap-1'><span><ReactStars
                                count={5}
                                value={coursedata?.ratingandreview?.length}
                                // onChange={ratingChanged}
                                size={20}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                                edit={false} 
                              /></span>
                              <span>({coursedata?.ratingandreview.length} reviews)</span>
                               <span className='ml-2'>{coursedata?.studentEnrolled?.length} students enrolled</span>
                              </p>
            <p>Created By {coursedata?.instructor?.firstName} {coursedata?.instructor?.lastName}</p>
            <p className='flex items-center gap-1'><span><CiCircleInfo /></span><span>Created at {Formatdate(coursedata?.createdAt)}</span><span className='ml-5'><CiGlobe /></span><span>English</span></p>

            <div className='w-[80%] mt-4 py-6 border-slate-500 border-1 rounded'>
                <div className='text-2xl font-semibold'>What you'll Learn</div>
                <div className='mt-4'>{coursedata?.whatyouwilllearn??"This course is going to be top guided course"}</div>
            </div>
            <div className='mt-4'>
                <div className='text-2xl font-semibold'>
                    Course Content
                </div>
            </div>

            <div className='w-[80%] mt-4 '>
                <p>{coursedata?.coursecontent?.length} Section(s) {totalsubsection} Subsection(s) </p>
              
            </div>
            <div className='w-[80%]  mt-4'>
                {coursedata?.coursecontent?.map((section,index)=>(
                    <div className='w-full border-b-slate-200' >

                    <div className='flex justify-between bg-slate-700 p-4 border-b-slate-500 border-b' onClick={()=>showHideSubsectionHandler(index)}>
                    <div className='flex items-center gap-3'><span  className={`transition-transform duration-300 ${visiblesubssection === index ? "rotate-180" : "rotate-0"}`}><IoChevronDown /></span ><span className='text-[17px]'>{section?.sectionname}</span></div>
                    <div className="flex items-center gap-2 text-yellow-500">
                    <span>{section?.subsection?.length || 0} lecture(s)</span></div>     
                    </div>
                    {visiblesubssection===index &&
                        <div className='py-4 px-2 border-slate-500 border'>
                            {section?.subsection?.map((subsec)=>(
                            <div className='flex items-center gap-2 '><span><BiVideo /></span>{subsec?.title}</div>
                        ))}
                        </div>
                        }
        
                    </div>
                     
                ))}
              
            </div>
            <div className='text-2xl font-semibold mt-5'>About Author</div>
            <div className='flex items-center gap-5'>
                <div className='w-[70px] h-[70px] rounded-full border mt-4 overflow-hidden '>
                    <img src={coursedata?.instructor?.image} alt="" className='w-full h-full'/>
                </div>
                    <div className='text-white font-bold text-[18px]'>{coursedata?.instructor?.firstName} {coursedata?.instructor?.lastName}</div>
            </div>
        </div>

   
        <div>
           <CourseDetailsCard coursedata={coursedata}/>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
