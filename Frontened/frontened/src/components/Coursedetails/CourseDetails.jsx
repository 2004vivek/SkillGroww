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
    console.log("this is coursedata",coursedata)

    useEffect(()=>{
                let lecture=0;
                coursedata?.coursecontent?.forEach(section => {
                    lecture=lecture+section?.subsection?.length||0
                });
            settotalsubsection(lecture)
    },[coursedata])

    
    const fetchingCourseDetails=async()=>{
        try {
             const response=await axios.post(`https://skillgroww-1.onrender.com/api/v1/course/getcoursedetails`,{
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

    //calculating the average rating
    const calculateAverageRating=(ratingandreview)=>{
        let totalrating= ratingandreview?.reduce((sum,rate)=>parseFloat(rate.rating)+sum,0)
        console.log("this is totalrating",totalrating)
        return ratingandreview?.length>0 ? totalrating/ratingandreview?.length:0
       }


  return (
    <>
    <Navbar/>
    <div className='text-white md:w-[85%] w-[90%] m-auto mt-10'>
      <div className='flex justify-between md:flex-row flex-col-reverse'>
        <div className='md:w-[70%] h-fit mt-6'>
            <h3 className='md:text-4xl text-[20px] font-bold'>{coursedata?.coursename}</h3>
            <p className='text-slate-400 mt-2 text-[16px]'>{coursedata?.coursedescription}</p>
            <p className='flex items-center text-[12px] md:text-[16px] gap-1'>
            <span className='text-yellow-400 font-bold'>{calculateAverageRating(coursedata?.ratingandreview)}</span>
                <span >
                    <ReactStars
                              key={calculateAverageRating(coursedata?.ratingandreview)}
                                count={5}
                                value={calculateAverageRating(coursedata?.ratingandreview)}
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
            <p className='text-[14px] md:text-[16px]'>Created By {coursedata?.instructor?.firstName} {coursedata?.instructor?.lastName}</p>

            <div className='flex flex-col md:flex-row'>
                <div className='flex items-center gap-1 mt-2'>
                     <span><CiCircleInfo /></span>
                     <span className='text-[14px] md:text-[16px]'>Created at {Formatdate(coursedata?.createdAt)}</span>
                </div>

                <div className='flex place-items-center mt-2'>
                  <div className='ml-2 mr-1'><CiGlobe size={14}/></div><div className='text-[14px] md:text-[16px]'>English</div>
                </div>

                </div>
           

            <div className='w-[80%]  py-6 '>
                <div className='md:text-2xl text-[18px] font-semibold'>What you'll Learn</div>
                <div className='mt-4 text-[14px] md:text-[16px]'>{coursedata?.whatyouwilllearn??"This course is going to be top guided course"}</div>
            </div>
            <div className='mt-4'>
                <div className='md:text-2xl text-[18px] font-semibold'>
                    Course Content
                </div>
            </div>

            <div className='w-[80%] mt-2 text-[14px] md:text-[16px]'>
                <p>{coursedata?.coursecontent?.length} Section(s) {totalsubsection} Subsection(s) </p>
              
            </div>
            <div className='md:w-[80%] w-full  mt-4'>
                {coursedata?.coursecontent?.map((section,index)=>(
                    <div className='w-full border-b-slate-200' >

                    <div className='flex justify-between bg-slate-700 p-4 border-b-slate-500 border-b' onClick={()=>showHideSubsectionHandler(index)}>
                    <div className='flex items-center gap-3'><span  className={`transition-transform duration-300 ${visiblesubssection === index ? "rotate-180" : "rotate-0"}`}><IoChevronDown /></span ><span className='text-[14px] md:text-[18px]'>{section?.sectionname}</span></div>
                    <div className="flex items-center gap-2 text-yellow-500">
                    <span className='text-[14px] md:text-[18px]'>{section?.subsection?.length || 0} lecture(s)</span></div>     
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
            <div className='md:text-2xl font-semibold mt-5 text-[18px]'>About Author</div>
            <div className='flex items-center gap-5'>
                <div className='md:w-[70px] md:h-[70px] w-[50px] h-[50px] rounded-full border mt-4 overflow-hidden '>
                    <img src={coursedata?.instructor?.image} alt="" className='w-full h-full'/>
                </div>
                    <div className='text-white font-bold md:text-[18px] text-[14px]'>{coursedata?.instructor?.firstName} {coursedata?.instructor?.lastName}</div>
            </div>
        </div>

   
        <div className='md:w-[320px] w-[300px] max-md:self-center'>
           <CourseDetailsCard coursedata={coursedata}/>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
