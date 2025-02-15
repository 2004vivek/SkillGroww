import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';
import ReactStars from "react-rating-stars-component";
import 'swiper/css';
import axios from 'axios';
import { useState } from 'react';
export default function RatingSlider() {
    const [rating,setrating]=useState([])
    const getAllReviewsAndRatings=async()=>{
        try {
            const response=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/getreviews`)
            console.log(response?.data?.allreview)
            setrating(response?.data?.allreview)
        } catch (error) {
            console.log("this is all review and rating",error?.response?.message||error?.message)
        }
    }

    useEffect(() => {
     getAllReviewsAndRatings();
    }, [])
    
  return (
    <>
    <div className='text-center md:text-3xl text-[18px] font-semibold my-4 text-white w-[80%] mx-auto'>Reviews from other Learner</div>
    <Swiper
    modules={[Navigation, Pagination,Autoplay]}
    spaceBetween={15}
    freeMode={true}
    // loop={true}
    pagination={{clickable:true}}
    // autoplay={{
    //     delay: 3000, 
    //     pauseOnMouseEnter: true,  
    // }}
    breakpoints={{
        320: { slidesPerView: 1 },  
        640: { slidesPerView: 1 }, 
        768: { slidesPerView: 2 },  
        1024: { slidesPerView: 3 }, 
        1440: { slidesPerView: 3 }, 
    }}
    className='md:w-[80%] w-[95%] md:mx-auto flex justify-center'
    >
   {rating.map((item,index)=>(
    <SwiperSlide key={index} className='lg:w-[370px] lg:h-[150px] md:w-[320px] h-[150px] w-[100%]   bg-slate-800 p-4 rounded border-b-blue-600 border-b-2 '>
        <div className='flex'>
        <div className='w-[54px] h-[54px] rounded-full'><img src= {item.user.image} alt="profile" className='w-full h-full rounded-full'/></div>
        <div className='ml-4'>
            <div className='text-white text-[16px]'>{item?.user?.firstName} {item?.user?.lastName}</div>
            <div className='text-slate-400'>{item?.course?.coursename}</div>
        </div>
        </div>
        <div className='text-white mt-4'>{item?.review?.length>35 ? item?.review?.slice(0,35)+"...":item?.review}</div>
        <div className='flex items-center gap-3'>
            <div className='text-[#ffd700] font-bold'>{item?.rating}</div>
            <div> <ReactStars
            count={5}
            value={item?.rating}
          
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            edit={false} 
          /></div>
        </div>
       
       
    </SwiperSlide>
   ))}

  </Swiper>
      </>
  )
}
