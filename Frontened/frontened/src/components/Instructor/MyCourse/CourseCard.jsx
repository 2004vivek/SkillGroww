import React, { useContext, useEffect } from "react";
import axios from "axios";
import { CourseContext } from "../../../context/CourseContext";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { Appcontext } from "../../../context/AppContext";
import { IoTimerOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from '../../CoreComponent/Dashboard/ConfirmationModal'
export default function CourseCard() {
  const user = JSON.parse(localStorage.getItem("usertype"));
  const userid = user._id;
  const token=localStorage.getItem("token")
  const { allcourses, setallcourses,showdeleteshowmodal,setshowdeleteshowmodal,seteditcourse,deletedcourseid,setdeletedcourseid} = useContext(CourseContext);
  const {loading,setloading}=useContext(Appcontext)
  const navigate=useNavigate();
  
  const getCourse = async () => {
    try {
      setloading(true);
      setallcourses([])
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/getallcourses/${userid}`
      );
      console.log("processing....");
      console.log("this is course details", response.data.allcourses);
      setallcourses(response.data.allcourses);

    } catch (error) {
      console.log("course error", error.response?.data||error.message);
    }
    finally{
      setloading(false)
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  console.log("this is inside delete modal ",deletedcourseid)
  const handleDeleteCourse=async(courseid)=>{
   
    try {
      setdeletedcourseid(courseid)
      const deletecourse=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/deletecourse`,{
        courseid:deletedcourseid
      },
      {
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
    )

    const updatedcourse=deletecourse.data.updatedcourse
    const filteredcourse= allcourses.filter((course)=>course._id!=updatedcourse._id)
    setallcourses(filteredcourse)
    console.log("this is deleted course",deletecourse.data.message)
    toast.success(deletecourse.data.message)
    setshowdeleteshowmodal(false);
    } catch (error) {
      console.log(error?.response?.data||error.message)
    }
  }

  return (
    <>
    {loading?<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">Loading...</div>:( 
      <div className="w-full flex flex-col mt-4">
      {allcourses?.length === 0 ? (
        <div className="text-[16px] text-white">No course enrolled</div>
      ) : (
        allcourses?.map((course) => (
          
          <div className="w-full flex bg-white/10 py-5  px-3 rounded-md border mb-4">
      
            <div className="w-[70%] gap-3 flex items-center text-slate-400 font-semibold">
              <div className="w-[200px] h-[130px] rounded-md overflow-hidden border ">
                <video
                  src={course?.thumbnails}
                  alt="course"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-[85%] space-y-2">
                <h3 className="text-white text-[16px]">{course?.coursename}</h3>
                <p className="text-slate-400 text-[12px]">
                  {course?.coursedescription}
                </p>
                <p className="text-slate-400 text-[12px]">
                  Created:03 Mar,2024 |1:00
                </p>
                <div className={`text-[13px] text-bold  w-fit rounded-lg py-[6px] gap-1 items-center text-white font-bold flex  px-4 ${course?.status==="Published"?"bg-green-600":"bg-red-500"}`}><span><IoTimerOutline fontSize={"16px"}/></span>{course?.status??"Draft"}</div>
              </div>
             
            </div>
            <div className="w-[20%] border flex items-center text-slate-400 font-semibold">
              6:30
              {/* {course.coursecontent.map((section) => (
                <div key={section._id}>
                  {section.subsection.map((sub,index) => (
                    <div key={sub._id} className="ml-4">
                      {
                        index===index&&  <p>Duration: {sub.timeduration}</p>
                      }
                    
                    </div>
                  ))}
                </div>
              ))} */}
            </div>
            <div className="w-[20%] border flex items-center text-slate-400 font-semibold">
              {course?.price}
            </div>
            <div className="w-[20%] border justify-evenly flex items-center text-slate-400 font-semibold">
            <MdModeEditOutline fontSize="18px" className="cursor-pointer" onClick={()=>{navigate(`/dashboard/editcourse/${course._id}`);seteditcourse(true)}}/>
            <RiDeleteBin7Fill fontSize="18px" className="cursor-pointer" onClick={()=>{setshowdeleteshowmodal(true); setdeletedcourseid(course._id); console.log("this is course to be deleted",course._id)}}/>
            {
            showdeleteshowmodal&& <ConfirmationModal showmodal={showdeleteshowmodal} onclose={()=>setshowdeleteshowmodal(false)} heading={"Delete This Course?"} content={"This course will be deleted permanently."} btn1text={"Delete"} btn2text={"Cancel"} btn1handler={()=>{handleDeleteCourse(course._id); }} btn2handler={()=>setshowdeleteshowmodal(false)}/> 
          }
            </div>
         
          </div>
        ))
      )}
    </div>
  )}
 
    </>
   
  );
}
