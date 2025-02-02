import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { CourseContext } from "../../../context/CourseContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import NestedView from "./NestedView";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function CourseBuilderForm() {
  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm();
  const {
    coursecreation,
    setcoursecreation,
    courseCreationHandler,
    setposition,
    position,
    allcourses,
    editcourse,
    seteditcourse,
    course,
    setcourse,
    editsection,
    seteditsection,
    sectionid,
    setsectionid,
    loader,
    setloader,
  } = useContext(CourseContext);

  const courseid = localStorage.getItem("courseid");

  const token = localStorage.getItem("token");

  const getcoursedetails = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/getcoursedetails`,
        { courseid }
      );
      setcourse(response.data.coursedetails);
      console.log(
        "this is particular course details",
        response.data.coursedetails
      );
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    getcoursedetails();
  }, []);

  //update a section
  const handleEditSection = async (sectionname, sectionid) => {
    seteditsection(true);
    setsectionid(sectionid);
    setValue("sectionname", sectionname);
  };

  const onSubmitHandler = async (data) => {
    //edit the section
    if (editsection) {
      try {
        setloader(true);
        const editsection = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/updatesection`,
          {
            sectionname: data.sectionname,
            sectionid: sectionid,
            courseid: courseid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("this is subsection",editsection.data);
        toast.success(editsection.data.message);
        const sectionafterupdation = editsection.data.updatedcourse;
        console.log("this is after updatedcoursecontent", sectionafterupdation);
        setcourse(sectionafterupdation);

        cancelEditSection();
      } catch (error) {
        toast.error("Error Occured");
        console.log(error?.response || error.message);
      } finally {
        setloader(false);
      }
    }
    //create a section
    else {
      try {
        setloader(true);
        const createsection = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/addsection`,
          {
            sectionname: data.sectionname,
            courseid: courseid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("this is about section", createsection.data.data);
        console.log("thisis coursecontent",course.coursecontent)

        const updatedsection=createsection.data.data

        // setcourse(createsection?.data?.data);
        setcourse((prevcourse)=>({
          ...prevcourse,coursecontent:[...prevcourse.coursecontent,updatedsection]
        }))
        setValue("sectionname", "");
        toast.success(createsection?.data?.message);
      } catch (error) {
        toast.error(error?.response?.message);
        console.log("there is an error", error.response || error.message);
      } finally {
        setloader(false);
      }
    }
    courseCreationHandler(data);
    // if(isSubmitSuccessful){
    //   setposition(3)
    // }
  };

  const setGoback = () => {
    setposition((prev) => (prev > 0 ? prev - 1 : prev));
    seteditcourse(true);
  };

  const setMoveFront = () => {
    if (course.coursecontent.length === 0) {
      toast.error("Please add at least one section");
      return;
    }
    if (
      course.coursecontent.some((section) => section.subsection.length === 0)
    ) {
      toast.error("Please add atleast one subsection ");
      return;
    }
    setposition((prev) => (prev > 3 ? prev : prev + 1));
  };
  const cancelEditSection = () => {
    seteditsection(!editsection);
    setValue("sectionname", "");
  };
  return (
    <div className="w-full">
      <h3 className="text-white lg:text-3xl font-bold">Course Builder</h3>
      <form action="" onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <label htmlFor="" className="text-[16px] text-white">
            Section Name<sup>*</sup>
          </label>
          <div>
            <input
              type="text"
              name="sectionname"
              className="bg-gray-800 rounded  w-full  p-[8px] text-white mt-2 text-[14px]"
              placeholder="Enter Section Name"
              {...register("sectionname", { required: true })}
            />
            {errors.sectionname && (
              <div className="text-red-600 text-[12px]">
                Section is Required
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex gap-7 items-center">
          <div className="mt-4 flex ">
            <button
              type="submit"
              className="bg-black border text-yellow-500 shadow-md text-[15px] py-[6px] px-[6px] font-bold rounded-lg border-yellow-500 gap-2 flex items-center"
            >
              <span className="inline-block">
                {editsection ? "Edit Section Name" : "Create Section"}
              </span>
              <span className="inline-block">
                <IoIosAddCircleOutline fontSize="20px" />
              </span>
            </button>
          </div>

          {editsection && (
            <button
              type="button"
              className="text-sm text-slate-400 underline mt-4"
              onClick={cancelEditSection}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      
      {course?.coursecontent?.length > 0 && (
        <NestedView handleEditSection={handleEditSection}></NestedView>
      )}

      <div className="w-full gap-3 mt-4 flex justify-end">
        <button
          type="button"
          onClick={setGoback}
          className="bg-white text-[18px] text-black font-bold py-1 px-5 rounded-lg cursor-pointer"
        >
          Back
        </button>

        <button
          type="button"
          className="bg-yellow-500 text-[18px] text-black font-bold py-1 px-5 rounded-lg cursor-pointer"
          onClick={setMoveFront}
        >
          Next
        </button>
      </div>
    </div>
  );
}
