import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { CourseContext } from "../../context/CourseContext";
import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import VideoElement from "./VideoElement";
import ReviewAndRatingModal from '../ViewCourse/ReviewAndRatingModal'
export default function SidebarVideoDetails({ totalsubsection }) {
  const {
    coursedata,
    setcoursedata,
    videopreview,
    setvideopreview,
    loader,
    setloader,
    setmarkcompleted,setrewatch,
    setcompletedsubsectionid,
    completedsubsectionid,
    completedvideo,setcompletedvideo,
    showreviewmodal,setshowreviewmodal
  } = useContext(CourseContext);


  const navigate = useNavigate();

  const [showsection, setshowsection] = useState(null);
  
  //bydefault first lecture will be displayed
  let subsectionid = coursedata?.coursecontent?.[0]?._id;
  let videourl = coursedata?.coursecontent?.[0]?.subsection?.[0]?.videourl;
  useEffect(() => {
    setvideopreview(videourl);
    setshowsection(subsectionid);

    console.log("this is subsection id inside useffect", subsectionid);
    setmarkcompleted(false);
    setrewatch(false)
  }, [completedvideo]);

  const showSubsectionHandler = (sectionid) => {
  
    setshowsection((prev) => (prev === sectionid ? null : sectionid));
    
    
    let selectedsection=coursedata?.coursecontent?.filter((section)=>section?._id===sectionid);
    setvideopreview(selectedsection?.subsection?.[0]?.videourl);

    setmarkcompleted(false)
    setrewatch(false)
    
  };


  const showVideoHandler=(videourl)=>{
    setvideopreview(videourl);
  }

  return (
    <>
      <div className="min-w-[250px] p-2  bg-slate-900 ">
        <div className="w-full mt-2 flex justify-between">
          <span>
             <IoArrowBackCircleOutline
            className="cursor-pointer"
            color="white"
            size={28}
            onClick={() => navigate(-1)}
          /></span>
          <button className="bg-yellow-400 p-2 rounded-md font-bold" onClick={()=>setshowreviewmodal(true)}>Add Review</button>
        {showreviewmodal&&<ReviewAndRatingModal></ReviewAndRatingModal>}
        </div>
        <div className="text-white text-[20px] mt-4 font-bold">
          {coursedata?.coursename}
        </div>
        <div className="text-white mt-4">{completedvideo?.length||0} / {totalsubsection}</div>
        <div className="w-full border-[0.5px] border-gray-800 my-4"></div>
        <div>
          {coursedata?.coursecontent?.map((section) => (
            <>
              <div
                className="text-white bg-gray-700 p-4 rounded cursor-pointer my-4 flex items-center justify-between"
                onClick={() => showSubsectionHandler(section?._id)}
              >
                <span>{section?.sectionname}</span>
                <span
                  className={`transition-transform duration-300 ${
                    showsection === section?._id ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <IoChevronDown />
                </span>
              </div>
              {showsection === section?._id &&
                section?.subsection?.map((subs, index) => (
                  <div
                    className={`flex gap-3 mt-1 w-[90%] mx-auto cursor-pointer ${videopreview === subs.videourl ? "bg-yellow-500 text-black font-bold p-3 rounded" : "bg-gray-800 text-white rounded p-3"}` }
                    onClick={()=>{showVideoHandler(subs?.videourl);setcompletedsubsectionid(subs?._id)}}
                  >
                    <input type="checkbox" checked={completedvideo?.includes(subs?._id)?true:false} onChange={()=>completedvideo.includes(subs?._id)}/>
                    <div key={index} className="text-white" >
                      {subs?.title}
                    </div>
                  </div>
                ))}
            </>
          ))}
        </div>
      </div>
    </>
  );
}
