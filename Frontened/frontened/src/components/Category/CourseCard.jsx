import React from 'react'
import ReactStars from "react-rating-stars-component";
export default function CourseCard({course}) {
  return (
    <div className='text-white flex'>
     
      <div className='flex gap-5'>
         {course?.map((coursedata)=>(
                // coursedata?.course?.map((data)=>(
                    <div className='text-white'>
                    {/* {console.log("this is done bhai",data)} */}
                   <video src={coursedata?.thumbnails} alt="courseurl" className='w-[400px] h-[250px] mt-6 object-cover rounded-lg'/> 
                   <div className='text-white mt-4'>{coursedata?.coursename}</div>
                   <div className='flex items-center '>
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
                   
                </div>
                // )
            )
            
            // console.log("this is done bhai",coursedata.course)
    
       
        
      )}
    
      </div>
      

    </div>
  )
}
