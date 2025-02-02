import React, { useContext, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";

import { CourseContext } from "../../context/CourseContext";
import axios from "axios";
import { toast } from "react-toastify";
export default function ReviewAndRatingModal() {
  const userdetails = JSON.parse(localStorage.getItem("usertype"));

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [ratingvalue, setratingvalue] = useState(0);
  const [ratingformdata,setratingformdata]=useState(null);

  const { showreviewmodal, setshowreviewmodal,coursedata ,setloader,loader} = useContext(CourseContext);
  console.log("this is course id",coursedata._id)

  const ratingChanged = (newrating) => {
    console.log(newrating);
    setratingvalue(newrating);
  };

  const token=localStorage.getItem('token')

  const handleRatingSubmit = async(data) => {
    try {
        // setloader(true)
        const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/createrating`,
            {
                review:data.review,
                rating:ratingvalue,
                courseid:coursedata._id

            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        console.log(response)
        toast.success(response?.data?.message)

    } catch (error) {
        console.log("error while creating rating and review",error?.response?.data?.message)
        toast.error(error?.response?.data?.message||error?.message)

    }
    finally{
        setshowreviewmodal(false)
    }
  };

  return (
    <div
      className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
      role="dialog"
    >
      <div className="modal-dialog md:w-full w-11/12 max-w-sm mx-auto bg-slate-800 rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-header flex justify-between items-center p-4 border-gray-700 bg-slate-400/20">
            <h4 className="modal-title text-white font-bold text-2xl">
              Add Reviews
            </h4>
            <button
              type="button"
              className="close text-white text-2xl"
              onClick={() => setshowreviewmodal(false)}
            >
              &times;
            </button>
          </div>
          <div className="modal-body p-2 text-gray-300 text-[14px] font-medium mt-4">
            <div className="flex justify-center w-full gap-4">
              <div className="w-[60px] h-[60px] rounded-full border">
                <img
                  src={userdetails?.image}
                  alt="profile"
                  className="w-full h-full rounded-full"
                />
              </div>
              <div>
                <p className="mb-1 font-bold  text-[18px]">
                  {userdetails?.firstName} {userdetails?.lastName}
                </p>
                <p>Posting Publicy</p>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={26}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </div>
            </div>

            <div className="w-[100%] mx-auto">
              <form action="" onSubmit={handleSubmit(handleRatingSubmit)}>
                <div className="my-4">Add Your Experience</div>
                <textarea
                  className="bg-slate-900 h-[110px] w-full p-2"
                  placeholder="Add Your Experience"
                  {...register("review", { required: true })}
                ></textarea>
                {errors?.review&&<div className="text-[12px] text-red-600"><sup>*</sup>Please write your expierence</div>}

                <div className=" flex p-4 gap-3 border-gray-700">
                  <button
                    type="submit"
                    className="btn bg-yellow-500 text-black font-bold px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="btn bg-gray-300 text-black font-bold px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setshowreviewmodal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
