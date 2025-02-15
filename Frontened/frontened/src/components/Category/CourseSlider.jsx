import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation, Pagination } from 'swiper/modules';
import { FaWhatsapp } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function CourseSlider({course}) {

  const navigate=useNavigate();



  const handleCourseDetails=async(courseid)=>{
    console.log("this is courseid",courseid);
    navigate(`/course/${courseid}`);
   
  }

  const calculateAverageRating=(ratingandreview)=>{
   let totalrating= ratingandreview.reduce((sum,rate)=>parseFloat(rate.rating)+sum,0)
   console.log("this is totalrating",totalrating)
   return ratingandreview?.length>0 ? totalrating/ratingandreview?.length:0
  }
  return (
    <div className='text-white'>
      {course?.length===0?<div className='text-white mt-4'>No Courses Found</div>:
      <Swiper
      modules={[Pagination,Navigation]}
      // slidesPerView={3}
      freeMode={true}
      spaceBetween={25}
      grabCursor={true}
      navigation={{
        prevEl: '.custom-prev', 
        nextEl: '.custom-next', 
      }}
      breakpoints={{
        320: { slidesPerView: 1 },  
        640: { slidesPerView: 1 }, 
        768: { slidesPerView: 2 },  
        1024: { slidesPerView: 3 }, 
        1440: { slidesPerView: 3 }, 
      }}
      loop={true}
      pagination={{ clickable: true }}
      >
         { course?.map((coursedata)=>(
        <SwiperSlide className='text-white cursor-pointer' onClick={()=>handleCourseDetails(coursedata._id)}>
           <video src={coursedata?.thumbnails} alt="courseurl" className='w-[400px] h-[250px] mt-6 object-cover rounded-lg'/> 
           <div className='text-white mt-4 text-[14px] md:text-[16px]'>{coursedata?.coursename}</div>
           <div className='flex items-center gap-2'>
            <span className='text-yellow-400 font-bold text-[14px] md:text-[16px]'>{calculateAverageRating(coursedata?.ratingandreview)}</span>
            <span className='text-[14px] md:text-[16px]'>
            <ReactStars
            count={5}
            value={calculateAverageRating(coursedata?.ratingandreview)}
            // onChange={ratingChanged}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            edit={false} 
          />
            </span>
            <span className='text-[14px] md:text-[16px]'>{coursedata?.ratingandreview.length} Ratings</span>
           </div>
           <div className='text-white text-[14px] md:text-[16px]'>Rs {coursedata?.price}</div>
           
        </SwiperSlide>
        
      ))}
    
      </Swiper>
      }
  
  

    </div>
  )
}
