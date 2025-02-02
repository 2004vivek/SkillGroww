import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";
import { CourseContext } from "../../../context/CourseContext";
import { useEffect } from "react";
import { Appcontext } from "../../../context/AppContext";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function CourseInformationForm() {

  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    setValue,
    getValues,
    watch
  } = useForm();

  const token=(localStorage.getItem("token"))


  const {course,setcourse,editcourse,seteditcourse,status,courseid } = useContext(CourseContext);

  console.log("this is status inside course info",status)
  

  const {subcategory,loading,setloading}=useContext(Appcontext);


  const [imagepreview, setimagepreview] = useState([]);
  console.log("this is edit course",imagepreview);

 

  const [tag,settag]=useState([]);

  
  console.log("this is user id",courseid)
  
  const handlekeyDown=(e)=>{
    if(e.key==="Enter"||e.key==","){
        e.preventDefault();
        const {value}=e.target;
        const tagvalue=value.trim()
        if(tagvalue&& tagvalue.length > 0 && !tag.includes(tagvalue)){
            settag([...tag,tagvalue])
           
            setValue("tag","")

        }
    }
    
  }
  useEffect(()=>{
    if(editcourse){
      setValue("coursename",course.coursename)
      setValue("coursedescription",course.coursedescription)
      setValue("whatyouwilllearn",course.whatyouwilllearn)
      setValue("price",course.price)
      setValue("thumbnails",course.thumbnails)
      setValue("category",course.category)
      settag(course.tag);
      setrequirement(course.instruction)
    }
  },[courseid])
  
  const onSubmitHandler=async(data)=>{
   
    const coursedata={...data,tag:JSON.stringify(tag),instruction:JSON.stringify(requirement)}
 
   
    //edit a course
    if(editcourse){
      const formdata=new FormData()
      if(course.coursename!==coursedata.coursename){
        formdata.append("coursename",coursedata.coursename)
      }
      if(course.coursedescription!==coursedata. coursedescription){
        formdata.append("coursedescription",coursedata.coursedescription)
      }
      if(course.whatyouwilllearn!==coursedata.whatyouwilllearn){
        formdata.append("whatyouwilllearn",coursedata.whatyouwilllearn)
      }
      if(course.price!==coursedata.price){
        formdata.append("price",coursedata.price)
      }
      if(course.thumbnails!==coursedata.thumbnails){
          formdata.append("thumbnails",coursedata.thumbnails[0])
      }
      if(course.category._id!==coursedata.category._id){
        formdata.append("category",coursedata.category._id)
      }
      if(course.tag!==coursedata.tag){
        formdata.append("tag",(coursedata.tag))
      }
      if(course.instruction!==coursedata.tag){
        formdata.append("instruction",(coursedata.instruction));
      }

      try {
        setloading(true)
        const updatedcourse=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/editcourse/${courseid}`,
          formdata,
          {
            headers:{
              "Authorization":`Bearer ${token}`
            }
          }
        )

        console.log("this is updated course",updatedcourse.data);
        setposition(2);
        toast.success(updatedcourse.data.message)
      } catch (error) {
        console.log(error.response.data||error.message)
      }
      finally{
        setloading(false);
      }
      
      
    } //create a course
    else{
      const formdata=new FormData();
      formdata.append("coursename",coursedata.coursename);
      formdata.append("coursedescription",coursedata.coursedescription);
      formdata.append("whatyouwilllearn",coursedata.whatyouwilllearn);
      formdata.append("price",coursedata.price);
      formdata.append("thumbnails",coursedata.thumbnails[0]);
      formdata.append("category",coursedata.category);
      formdata.append("tag",(coursedata.tag));
      formdata.append("instruction",(coursedata.instruction));
      formdata.append("status","Draft");
      
      console.log("this is formdata",coursedata)
      

       //making a axios call
       try {
        setloading(true);
        const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/createcourse`,
          formdata,
          {
            headers:{
              // "Content-Type": "application/json",
              "Authorization":`Bearer ${token}`,
          }
          } 
        )
        
        console.log("this is about course creation",response?.data?.message)
        localStorage.setItem("courseid",response?.data?.data?._id)
        // if(response){
          setposition(2)
        // }
        if(response.data.success===true){
          toast.success(response?.data?.message)
        }
        else{
          toast.error(response?.data?.message) 
        }
        setcourse(response.data.data)
        
      } catch (error) {
        toast.error(error?.response?.data?.message||error.message)
        console.log("this is error",error?.response?.data?.message||error.message)
      }
      finally{
        setloading(false)
      }

    }
   
   
  }


  const [requirement,setrequirement]=useState([])
  const {setposition}=useContext(CourseContext)

  const fileInput = watch("thumbnails");
  
  useEffect(() => {
    if (fileInput && fileInput.length > 0) {
      if(typeof fileInput==="string"){
        setimagepreview(course?.thumbnails)
      }
      else{
        const file = fileInput[0];
        const temporaryurl = URL.createObjectURL(file); 
        setimagepreview(temporaryurl);
      }
     
    }
    else{
      setimagepreview(null)
    }
  }, [fileInput])

  
  console.log("this is imagepreviw",imagepreview)

  const requirementHandler=()=>{
    console.log(getValues("instruction"))
    if(requirement?.length>4){
      toast.error("You are allowed to add only 5 instructions.");
      return;
    }
    const trimedvalue=getValues("instruction")?.trim()
   
    if(getValues("instruction") && !requirement?.includes(trimedvalue)){
        setrequirement([...requirement,trimedvalue]);
        setValue("instruction","")
    }
  }

  const removeRequirement=(selectedrequirement)=>{
    const updatedrequirement=requirement.filter((value)=>value!=selectedrequirement)
    setrequirement(updatedrequirement)
  }

  const removeTag=(value)=>{
    console.log("this is value to be removed",value)
    const updatedtag=tag.filter((tag)=>value!=tag)
    console.log("this is updated tag",updatedtag)
    settag(updatedtag)
  }


  return (
    loading?( <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">
      Loading...
    </div>):(
       <div className="w-full ">
      <form action="" onSubmit={handleSubmit(onSubmitHandler)}>
        {/* coursetitle */}
        <div>
          <label htmlFor="" className="text-[16px] text-white">
            Course Title<sup>*</sup>
          </label>
          <div>
            <input
              type="text"
              name="coursename"
              className="bg-gray-800 rounded  w-full  p-[8px] text-white mt-2 text-[14px]"
              placeholder="Enter Course Title"
              {...register("coursename", { required: true })}
            />
            {errors.coursename && (
              <div className="text-red-600 text-[12px]">
                Course Title is Required
              </div>
            )}
          </div>
        </div>

       {/* course description */}
        <div>
          <label htmlFor="" className="text-[16px] text-white">
            Course Short Description<sup>*</sup>
          </label>
          <div>
            <textarea
              name="coursedescription"
              id=""
              className="bg-gray-800 rounded  w-full  p-[8px] text-white mt-2 text-[14px] h-[110px]"
              placeholder="Enter Description"
              {...register("coursedescription",{required:true})}
            ></textarea>
            {errors.coursedescription && (
              <div className="text-red-600 text-[12px]">
                Course Description is Required
              </div>
            )}
          </div>
        </div>

         {/* Prices */}
        <div>
          <label htmlFor="" className="text-[16px] text-white">
            Prices<sup>*</sup>
          </label>
          <div>
            <input
              type="text"
              name="price"
              className="bg-gray-800 rounded  w-full  p-[8px] text-white mt-2 text-[14px]"
              placeholder="Enter Course Price"
              {...register("price",{ required: "Please add at least one tag.",validate:(value)=>!isNaN(value)||"Only numeric values are allowed.", })}
            />
            {errors.price && (
              <div className="text-red-600 text-[12px]">
                {errors.price.message}
              </div>
            )}
          </div>
        </div>
          
          {/* Tags */}
        <div>
          <label htmlFor="" className="text-[16px] text-white">
            Tags<sup>*</sup>
          </label>
          <div className="flex gap-2 flex-wrap">
          {
            tag?.map((value)=>(
                <div className="text-[12px] flex text-yellow-500 bg-slate-800 w-fit h-fit rounded-lg px-2">{value} <span className="font-bold ml-2 text-[15px] cursor-pointer" onClick={()=>removeTag(value)}>x</span></div>
            ))
          }
          </div>
         
          <div>
            <input
              type="text"
              name="tag"
              className="bg-gray-800 rounded  w-full  p-[8px] text-white mt-2 text-[14px]"
              placeholder="Enter Course Tag"
              // onChange={(e)=>settag(e.target.value)}
              onKeyDown={handlekeyDown}
             
              {...register("tag",{validate:()=>tag.length>0 || "At least one tag is required."})}
            />
            {errors.tag && (
              <div className="text-red-600 text-[12px]">
               {errors.tag.message}
              </div>
            )}
          </div>
        </div>


       {/* Category */}
        <div>
          <label htmlFor="" className="text-[16px] text-white">
            Category<sup>*</sup>
          </label>
          <div>
            <select
              name="category"
              id=""
              className="bg-gray-800 h-[50px] rounded  w-full  p-[8px] text-white mt-2 text-[14px]"
              defaultValue={"Select an option"}
              {...register("category", { required: true })}
            >
              <option value="">
                Select a option
              </option>
              {subcategory?.map((sub,index) => (
                <option key={index} value={sub._id} className="w-full border">{sub.name}</option>
              ))}
            </select>

            {errors.category && (
              <div className="text-red-600 text-[12px]">
                Category is Required
              </div>
            )}
          </div>
        </div>

        {/* Course Thumbnail */}
        <div>
          <label htmlFor="" className="text-[16px] text-white">
            Course Thumbnail<sup>*</sup>
          </label>
          <div className=" bg-gray-800 w-full relative h-[230px]">
            <input
              type="file"
              id="fileinput"
              name="thumbnails" 
              className=" h-full hidden  rounded w-full  p-[8px] text-white mt-2 text-[14px]"
              placeholder=""
              {...register("thumbnails",{validate:(value)=>imagepreview!==null||(value&&value.length>0)|| "Lecture Video is required."})}
             
            />
            
            {
                imagepreview?
                (
                    <div className="w-full h-full relative">
                        <video src={imagepreview}  alt="Preview" className="object-cover w-full h-full rounded"/>
                        <button onClick={()=>{setimagepreview(null);setValue("thumbnails", null);document.getElementById("fileinput").value = "";}} className="absolute bottom-1 right-1 bg-black text-yellow-500 py-[4px] px-[8px] font-medium rounded-lg  text-[14px]">Reload</button>
                    </div>
                ):
                (
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
                      </label>
                      {" "}a file
                    </p>
                  </div>
                        </>
                )
            }
            {/* {errors.thumbnails && (
              <div className="text-red-600 text-[12px]">
                Course Thumbnail is Required
              </div>
            )} */}
          </div>
        </div>

       {/* Benefits */}
        <div className="mt-6">
          <label htmlFor="" className="text-[16px] text-white">
            Benefit of the course<sup>*</sup>
          </label>
          <div>
            <textarea
              name="whatyouwilllearn"
              id=""
              className="bg-gray-800 rounded  w-full  p-[8px] text-white mt-2 text-[14px] h-[110px]"
              placeholder="Enter Benefits of this course"
              {...register("whatyouwilllearn",{required:true})}
            ></textarea>
            {errors.whatyouwilllearn && (
              <div className="text-red-600 text-[12px]">
            Enter benefits of the course
              </div>
            )}
          </div>
        </div>

        {/* Requirement */}
        <div>
          <label htmlFor="" className="text-[16px] text-white">
            Requirement/Instruction<sup>*</sup>
          </label>
          <div>
            <input
              type="text"
              name="instruction"
              // onChange={(e)=>setrequirement(e.target.value)}
              className="bg-gray-800 rounded  w-full  p-[8px] text-white mt-2 text-[14px]"
              placeholder="Enter the instruction"
              {...register("instruction",{validate:()=>requirement.length>0||"Please add an instruction"})}
            
            />
            {errors.instruction && (
              <div className="text-red-600 text-[12px]">
              {errors.instruction.message}
              </div>
             )}
            <div className="text-[16px] font-bold text-yellow-500 cursor-pointer" onClick={requirementHandler}>Add</div>
            <div className="flex flex-col gap-3">
                {requirement?.map((value)=>(
                    <div className="text-[16px] text-white bg-slate-800 w-fit h-fit py-[2px] px-2 rounded-lg ">{value} <span className="cursor-pointer font-bold" onClick={()=>removeRequirement(value)}>x</span></div>
                ))}
            </div>
          </div>
        </div>


        <div className="w-full flex justify-end">
        <button type="submit" className="bg-yellow-500 text-[18px] text-black font-bold py-1 px-5 rounded-lg cursor-pointer">Next</button>
        </div>

      </form>
    </div>)
   
  );
}
