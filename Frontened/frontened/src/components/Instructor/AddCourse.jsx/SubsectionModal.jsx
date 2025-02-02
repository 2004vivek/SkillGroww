import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { useEffect } from 'react';
import { useContext } from 'react';
import { CourseContext } from '../../../context/CourseContext';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function SubsectionModal({heading,btntext,modaldata,mode}) {
    const {register,formState:{isSubmitSuccessful,errors},handleSubmit,getValues,setValue,reset,watch}=useForm()
  
    const {showsubsectionmodal,setshowsubsectionmodal,addsubsection,setaddsubsection,subsectionlist,setsubsectionlist,course,setcourse,imagepreview, setimagepreview,subsectionid,sectionid,editsubsection,seteditsubsection,loader,setloader,setviewsubsection,viewsubsection}=useContext(CourseContext)

    console.log("this is mode which i am waiting for",mode)

    const fileInput = watch("videourls");


    const token=localStorage.getItem("token")
      
    useEffect(() => {
      
      if (fileInput && fileInput[0]) {
        const file = fileInput[0];
        
        if (typeof file === "string" && file.startsWith("http")) {
          console.log("This is a local file string:", file);
          setimagepreview(file); 
          
        } else if (typeof file === "object") {
          console.log("This is a local file object:", file);
          const temporaryurl = URL.createObjectURL(file); 
          console.log("Temporary URL:", temporaryurl);
          setimagepreview(temporaryurl);
        }
      }
    }, [fileInput]);
    
     
    
      useEffect(()=>{
        
        if(modaldata){
          if(viewsubsection===false){
            seteditsubsection(true);
          }
          else{
            setviewsubsection(true);
          }
          setaddsubsection(null)
          setValue("title",modaldata?.title || "")
          setValue("description",modaldata?.description || "")
          
          setValue("videourls", modaldata.videourls[0] || "");
          setimagepreview(modaldata.videourls)
        }
        else{
          seteditsubsection(false)
          setviewsubsection(false)
          reset()
        }
        
      },[modaldata])

     
    const subSectionSubmitHandler=async(data)=>{
        if(editsubsection==true){
          console.log("bhai tm ab section update karne ja rha hai")
          const formdata=new FormData()

          if (data.videourls && data.videourls[0] && data.videourls!=='h') {
            
            formdata.append("videourls", data.videourls[0]); 
          } else if (imagepreview) {
           
            formdata.append("videourls", imagepreview);
          }
        
          // formdata.append("videourls",data.videourls[0])
          formdata.append("title",data.title)
          formdata.append("description",data.description)
          formdata.append("sectionid",sectionid)
          formdata.append("subsectionid",subsectionid)
          try {
            setloader(true)
            const updatesubsection=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/updatesubsection`,
              formdata,{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              }
            )
            
            const updatedsubsection=updatesubsection?.data?.updatedsubsection;

            console.log("this is about update subsection",updatesubsection.data)
    
            setshowsubsectionmodal(false);
            
            setcourse({...course,coursecontent:course.coursecontent.map((courseitem)=>{
              return {
                ...courseitem,subsection:courseitem?.subsection?.map((subsection)=>{
                  return subsection._id===updatedsubsection._id?updatedsubsection:subsection
                })
              }
            })})

            toast.success(updatesubsection.data.message)

          } catch (error) {
            toast.error(error?.response?.data||error.message)
            console.log(error?.response?.data||error.message)
          }
          finally{
            setloader(false)
          }

        }
        else{
          console.log("bhai tm ab section create karne ja rha hai")
            const formdata=new FormData()
            formdata.append("videourls",data.videourls[0])
            formdata.append("title",data.title)
            formdata.append("description",data.description)
            formdata.append("sectionid",addsubsection)
            try {
              setloader(true)
                const createsubsection=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/creatsubsection`,
                    formdata
                ,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                console.log("this is updated subsection showing section",createsubsection.data.updatedsection)
                const updatedSection = createsubsection.data.updatedsection;
                const updatedCourseContent = course.coursecontent.map((section) =>
                  section._id === updatedSection._id ? updatedSection : section
                );
                setcourse({...course,coursecontent:updatedCourseContent })
                setsubsectionlist(createsubsection.data.updatedsection)
                toast.success(createsubsection.data.message)

                setshowsubsectionmodal(false)
                setValue("title","")
                setValue("description","")
                setValue("videourls","")
            } catch (error) {
                console.log(error.message)
                toast.error(error?.response?.data||error.message)
            }
            finally{
              setloader(false)
            }
        }
        
        console.log("horray")
    }

    if(!showsubsectionmodal) return null;
  return (
    <div
    className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    role="dialog">
    <div className="modal-dialog w-[40%]  mx-auto bg-slate-900  rounded-lg shadow-lg overflow-hidden">
      <div className="modal-content">
        <div className="modal-header flex justify-between items-center border-gray-800 ">
            <div className='w-full bg-slate-800 flex justify-between  py-4'>
            <h4 className="modal-title text-white font-bold text-[20px] pl-4">{heading}</h4>
          <button
            type="button"
            className="close text-white text-3xl pr-4"
            onClick={()=>{setshowsubsectionmodal(false); setValue("title",""); setValue("description",""); setValue("videourls","");setimagepreview(null)}}
>
            &times;
          </button>
            </div>
         
        </div>
        <div className="modal-body px-5 py-2 text-gray-300 text-[14px] font-medium rounded-lg">
        <form action="" onSubmit={handleSubmit(subSectionSubmitHandler)}>
              <div>
                <label htmlFor="" className="text-[16px] text-white">
                  Lecture Video<sup>*</sup>
                </label>
                <div className=" bg-gray-800 w-full relative h-[230px]">
                  <input
                    type="file"
                    id="fileinput"
                    name="videourls"
                  
                    className=" h-full hidden  rounded w-full  p-[8px] text-white mt-2 text-[14px]"
                    placeholder=""
                    {...register("videourls",{validate:(value)=>imagepreview!==null||(value&&value.length>0)|| "Lecture Video is required."})}
                  />

                  {imagepreview!==null ? (
                    <div className="w-full h-full relative">
                      <video
                        src={imagepreview}
                        alt="Preview"
                        className="object-cover w-full h-full rounded"
                      />
                      {viewsubsection ? "" :<button
                        onClick={() => {
                          setimagepreview(null);
                          setValue("videourls", null);
                        }}
                        className="absolute bottom-1 right-1 bg-black text-yellow-500 py-[4px] px-[8px] font-medium rounded-lg  text-[14px]"
                      >
                        Reload
                      </button>}
                    </div>
                  ) : (
                    <>
                      <div className="absolute h-[45px] w-[45px] flex justify-center items-center rounded-full bg-black top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                        <IoCloudUploadOutline />
                      </div>
                      <div className="text-[14px] absolute  top-[65%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                        <p>Drag and Drop an image, or</p>
                        <p className="text-center">
                          Click to{" "}
                          <label
                            htmlFor="fileinput"
                            className="text-yellow-400 cursor-pointer"
                          >
                            Browse
                          </label>{" "}
                          a file
                        </p>
                      </div>
                    </>
                  )}
                  {/* {errors.thumbnails && (
                    <div className="text-red-600 text-[12px]">
                      Course Thumbnail is Required
                    </div>
                  )} */}
                </div>
              </div>

              <div className='mt-2'> 
          <label htmlFor="" className="text-[16px] text-white">
            Lecture Title<sup>*</sup>
          </label>
          <div>
            <input
              type="text"
              name="title"
              className="bg-gray-800 rounded  w-full  p-[8px] text-white mt-[2px] text-[14px]"
              placeholder="Enter Lecture Title"
              {...register("title", { required: true })}
            />
            {/* {errors.title && (
              <div className="text-red-600 text-[12px]">
                Lecture Title is Required
              </div>
            )} */}
          </div>
        </div>

        <div className='mt-2'>
          <label htmlFor="" className="text-[16px] text-white">
            Course Short Description<sup>*</sup>
          </label>
          <div>
            <textarea
              name="description"
              id=""
              className="bg-gray-800 rounded  w-full  p-[8px] text-white mt-[2px] text-[14px] h-[110px]"
              placeholder="Enter Description"
              {...register("description",{required:true})}
            ></textarea>
            {errors.coursedescription && (
              <div className="text-red-600 text-[12px]">
                Course Description is Required
              </div>
            )}
          </div>
        </div>

        <div className=" flex p-2 px-5 gap-3 border-gray-700 justify-end">
        {viewsubsection?"":<button
            type="submit"
            className=" bg-yellow-500 text-black font-bold px-4 py-2 rounded hover:bg-yellow-600"
            // onClick={btn1handler}
          >
           {btntext}
          </button>}
        </div>

            </form>
        </div>
        
      </div>
    </div>
  </div>
  )
}
