import React, { useEffect } from 'react'
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
    
  return (
    <div className='text-white'>
      {course?.length===0?<div className='text-white mt-4'>No Courses Found</div>:
      <Swiper
      modules={[Pagination,Navigation]}
      slidesPerView={3}
      freeMode={true}
      spaceBetween={25}
      grabCursor={true}
      navigation={{
        prevEl: '.custom-prev', 
        nextEl: '.custom-next', 
      }}
      
      loop={true}
      // pagination={{ clickable: true }}
      >
         { course?.map((coursedata)=>(
        <SwiperSlide className='text-white' onClick={()=>handleCourseDetails(coursedata._id)}>
           <video src={coursedata?.thumbnails} alt="courseurl" className='w-[400px] h-[250px] mt-6 object-cover rounded-lg'/> 
           <div className='text-white mt-4'>{coursedata?.coursename}</div>
           <div className='flex items-center gap-2'>
            <span>
            <ReactStars
            count={5}
            value={coursedata?.ratingandreview?.length}
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
            <span>{coursedata?.ratingandreview?.length} Ratings</span>
           </div>
           <div className='text-white'>Rs {coursedata?.price}</div>
           
        </SwiperSlide>
        
      ))}
    
      </Swiper>
      }
    {/* <div className="custom-prev absolute top-1/2 left-5 transform -translate-y-1/2 cursor-pointer border">
        <FaWhatsapp fontSize="16px" />
      </div>
      <div className="custom-next absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer">
        <FaWhatsapp fontSize="16px" />
      </div> */}
  

    </div>
  )
}
