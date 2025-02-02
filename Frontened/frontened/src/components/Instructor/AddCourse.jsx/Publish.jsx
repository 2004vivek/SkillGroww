import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { CourseContext } from '../../../context/CourseContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Publish() {
  const {register,handleSubmit,reset,formState:{isSubmitSuccessful}}=useForm()

  const [ischeckedboxmarked,setcheckboxmarked]=useState(false);

  const navigate=useNavigate();


  const {status,setstatus,course}=useContext(CourseContext);

  let courseid=course._id;

  let token=localStorage.getItem("token")

  const onFinalSubmitHandler=async(data)=>{
    // console.log("this is checkbox value",data.public)
    if(!ischeckedboxmarked){
      toast.error("Please tick a checkbox");
    }
    else{
      const updatedStatus = "Published"; 
    setstatus(updatedStatus);
      try {
        const courseupdated=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/updatecoursestatus`,
          {
            courseid:courseid,
            status:updatedStatus
          },
          {
            headers:{
              "Authorization":`Bearer ${token}`
            }
          }

        )
        console.log("this is course status",courseupdated.data.message);
        toast.success(courseupdated.data.message);
        navigate("/dashboard/courses")

      } catch (error) {
        console.log(error?.response?.data||error.message);
      }
      
    }
  }


  const {setposition}=useContext(CourseContext);
  return (
     <div>
          <div className='rounded-md bg-slate-800  p-4'>
          <p className="text-2xl font-bold">Publish Course</p>
          <form action="" onSubmit={handleSubmit(onFinalSubmitHandler)}>
            <div className='flex items-center gap-3'>
              <input type="checkbox" className='bg-slate-600 rounded h-3 w-3' name='public'
               {...register("public")} onChange={(e)=>setcheckboxmarked(e.target.checked)}/>
               <p className='text-slate-400 text-[16px] '>Make this course as public</p>
            </div>

            <div className='flex w-full justify-between mt-5'>
              <div>
                <button
                  type="button"
                  className="btn bg-slate-700 text-white py-2 px-6 text-[16px] font-semibold"
                  onClick={()=>setposition((prev)=>prev-1)}
                >
                  Back
                </button>
                
              </div>
             
              <div className='flex gap-4'>
                {course.status==="Published"? 
                <button
                  type="submit"
                  className="btn bg-yellow-500 text-black py-2 px-4 text-[16px] font-semibold"
                >
                   Save and Publish
                </button>:
                <>
                    <button
                    type="button"
                    className="btn bg-slate-700 text-white py-2 px-4 text-[16px] font-semibold"
                    onClick={()=>{navigate("/dashboard/courses");toast.success("Course Drafted Successfully!")}}
                  >
                     Save as Draft
                  </button>
                    <button
                    type="submit"
                    className="btn bg-yellow-500 text-black py-2 px-4 text-[16px] font-semibold"
                  >
                     Save and Publish
                  </button>
                    </>
                }
              </div>
              
            </div>
          </form>
          </div>

    
      
           
    
         
        </div>
  )
}
