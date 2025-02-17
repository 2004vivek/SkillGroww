import React from 'react'
import ReactStars from "react-rating-stars-component";
import { useNavigate } from 'react-router-dom';
export default function CourseCard({course}) {
  

  console.log("thsi iscourse",course)
  const navigate=useNavigate();

  const handleCourseDetails=async(courseid)=>{
    console.log("this is courseid",courseid);
    navigate(`/course/${courseid}`);
   
  }

  const calculateAverageRating=(ratingandreview)=>{
   let totalrating= ratingandreview.reduce((sum,rate)=>parseFloat(rate.rating)+sum,0)
   console.log("this is totalrating",totalrating)
   let average = ratingandreview?.length > 0 ? totalrating / ratingandreview?.length : 0;

   return parseFloat(average.toFixed(2));  
  }
  return (
    <div className='text-white flex'>
     
      <div className='flex gap-5'>
         {course?.map((coursedata)=>(
                    <div className='text-white cursor-pointer' onClick={()=>handleCourseDetails(coursedata._id)}>
                  
                   <video src={coursedata?.thumbnails} alt="courseurl" className='w-[400px] h-[250px] mt-6 object-cover rounded-lg'/> 
                   <div className='text-white mt-4'>{coursedata?.coursename}</div>
                   <div className='flex items-center '>
                    <span>
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
