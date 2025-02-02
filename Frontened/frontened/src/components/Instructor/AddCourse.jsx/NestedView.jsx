import React, { useContext, useState } from 'react'
import { CourseContext } from '../../../context/CourseContext'
import { RxDropdownMenu } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiSolidAdjust, BiSolidDownArrow } from 'react-icons/bi';
import axios from 'axios';
import { Appcontext } from '../../../context/AppContext';
import ConfirmationModal from '../../CoreComponent/Dashboard/ConfirmationModal';
import { toast } from 'react-toastify';
import { MdOutlineAddCircle } from "react-icons/md";
import SubsectionModal from './SubsectionModal';
import { BiSolidRightArrow } from "react-icons/bi";
export default function NestedView({handleEditSection}) {
  
  const [confirmsubsection,setconfirmsubsection]=useState(null)
  const token=localStorage.getItem("token");
  const courseid=localStorage.getItem("courseid")
  const {course,setcourse,editsection,seteditsection,loader,setloader,sectionid,setsectionid,showsubsectionmodal,setshowsubsectionmodal,addsubsection,setaddsubsection,subsectionlist,subsectionid,setsubsectionid,imagepreview, setimagepreview,modaldata,setmodaldata,edit,setedit,editsubsection,seteditsubsection,viewsubsection,setviewsubsection,showdeleteshowmodal,setshowdeleteshowmodal}=useContext(CourseContext);

  

  const [sectiondeleteid,setsectiondeleteid]=useState(null);

  const [subsectiondeletedid,setsubsectiondeletedid]=useState(null)

 console.log("this is editsubsection inside the nested view",editsubsection)

  //editing the subsection
  const handleEditSubSection=async(subsectionid,sectionid,title,description,videourls)=>{
    
    console.log("this is videourl inside nestedview",videourls)
    seteditsubsection(true)
    setviewsubsection(false);
    setshowsubsectionmodal(true)

    setsectionid(sectionid)
    setsubsectionid(subsectionid);
     setmodaldata({title:title,description:description,videourls:videourls})

  }


  //viewing the subsection
  const handleViewSubsection=(sectionid,subsectionid,title,description,videourls)=>{
    setshowsubsectionmodal(true)
    setviewsubsection(true)
    seteditsubsection(false)
    setsectionid(sectionid)
    setsubsectionid(subsectionid);
     setmodaldata({title:title,description:description,videourls:videourls})
  }



  //deleting a section
  const handleDeleteSection=(sectionids)=>{
    setsectiondeleteid(sectionids);
    setshowdeleteshowmodal(true)
  }

  //deleting a subsection
  const handleDeleteSubSection=(section,subsection)=>{
    console.log("this is subsection id",subsection)
    console.log("this is section id",section)
    setsectiondeleteid(section)
    setsubsectiondeletedid(subsection)
  }


  const DeleteSection=async()=>{
    try {
      const deletesection=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/deletesection`,
        {
          courseid:courseid,
          sectionid:sectiondeleteid
        }
      )
   
      setshowdeleteshowmodal(false);

      const updatedcourse=course.coursecontent.filter((section)=>section._id!=sectiondeleteid);
     
      setcourse({...course,coursecontent:updatedcourse})
      toast.success(deletesection.data.message)

    } catch (error) {
      console.log("error while deleting",error.message)
      toast.error(error?.response?.data||error.message)
    }
  }

  const [showoption,setshowoption]=useState(true);
  const toggleOption=(index)=>{
    setshowoption(showoption===index?null:index)
  
  }

 const DeleteSubSection=async()=>{
  try {
    const deletesubsection=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/deletesubsection`,
      {
        sectionid:sectiondeleteid,
        subsectionid:subsectiondeletedid
      },
      {
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
     
    )
    const deletedsubsection=deletesubsection.data.deletedsubsection;
  
    setcourse({
      ...course,coursecontent:course?.coursecontent.map((section)=>{
        return {
          ...section,subsection:section.subsection.filter((data)=>data._id!==deletedsubsection._id)
          
        }
      })
    })
    console.log("this is section to be deleted",deletesubsection.data.updatedsection)
    setsubsectiondeletedid(null)
    toast.success(deletesubsection.data.message)
  } catch (error) {
    console.log(error?.response?.data||error.message)
  }
 }

  return (
    loader?( <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">
      Loading...
    </div>):(
    <div>
      <div className='rounded-md bg-slate-800 mt-10 py-4'>
        {course?.coursecontent?.map((section,index)=>(
          <>
            <div className={`border-b-[0.5px] w-[90%] my-4 mx-auto  border-slate-700 cursor-pointer py-4 px-2 rounded-lg ${showoption===index?"bg-slate-600 ":""}`} onClick={()=>toggleOption(index)}>
              <div className='flex  justify-between '>
                <div className='items-center gap-3 flex text-[18px]'>
                <RxDropdownMenu />
                <div>{section.sectionname}</div>
                </div>
             
              <div className='flex text-[18px] items-center gap-4 text-slate-400'>
                <button type='button'><FaEdit onClick={()=>handleEditSection(section.sectionname,section._id)}/></button>
                <button type='button'><MdDelete onClick={()=>handleDeleteSection(section._id)}/></button>
                <span>|</span>
                <span >{showoption===index?<BiSolidDownArrow />:<BiSolidRightArrow />}</span>
              </div>

              </div>
            
        {
          showdeleteshowmodal&& <ConfirmationModal showmodal={showdeleteshowmodal} onclose={()=>setshowdeleteshowmodal(false)} heading={"Delete This Section?"} content={"All the lecture of this section will be deleted."} btn1text={"Delete"} btn2text={"Cancel"} btn1handler={()=>DeleteSection(section._id)} btn2handler={()=>setshowdeleteshowmodal(false)}/> 
        }

        {
          subsectiondeletedid&& <ConfirmationModal showmodal={subsectiondeletedid} onclose={()=>setsubsectiondeletedid(null)} heading={"Delete This SubSection?"} content={"This lecture of will be deleted."} btn1text={"Delete"} btn2text={"Cancel"} btn1handler={DeleteSubSection} btn2handler={()=>setsubsectiondeletedid(null)}/> 
        }
            </div>

        {/* subsection */}
      {showoption===index&& <div className='w-[85%] mx-auto '>
        {section?.subsection?.map((data,index)=>(
          <div key={index} className=''>
            <div className='flex justify-between  py-4 border-b-[0.5px] hover:bg-gray-900 px-3 rounded-lg border-slate-700'>
            <div className='items-center gap-3 flex '>
            <RxDropdownMenu />
            <div className='text-[16px] cursor-pointer' onClick={()=>handleViewSubsection(section._id,data._id,data.title,data.description,data.videourl)}>{data.title}</div>
            </div>

              <div className='flex text-[16px] items-center gap-4 text-slate-400'>
                <button type='button'><FaEdit onClick={()=>handleEditSubSection(data._id,section._id,data.title,data.description,data.videourl,)}/></button>
                <button type='button'><MdDelete onClick={()=>handleDeleteSubSection(section._id,data._id)}/></button>
               
              </div>

            </div>

      
          </div>
        ))}
        <button type='button' className='text-[16px] font-bold text-yellow-500 flex items-center gap-1 justify-center' onClick={()=>{setaddsubsection(section._id); setshowsubsectionmodal(true);seteditsubsection(false); setmodaldata(null); setviewsubsection(false); if(editsubsection==false){setimagepreview(null)} setaddsubsection(data._id)}}><MdOutlineAddCircle /> Add Lecture</button>
        
        </div>
        }
        </>
            
        ))}
      </div>

        {showsubsectionmodal && (
            <SubsectionModal
                key={editsubsection ? "edit" : viewsubsection?"view":"add"}
                heading={editsubsection ? "Editing Lecture" : viewsubsection?"Viewing Lecture" : "Adding Lecture"}
                btntext={editsubsection ? "Save Changes" :viewsubsection? "" :"Save"}
                modaldata={modaldata}
                mode={editsection?"edit":viewsubsection?"view":addsubsection?"add":""}
            />
        )}
       

     
    </div>
    )
    
  )
}
