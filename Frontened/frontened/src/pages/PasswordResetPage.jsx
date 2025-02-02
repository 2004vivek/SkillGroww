import React from "react";
import Navbar from "../components/CoreComponent/Navbar";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Appcontext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
export default function PasswordResetPage() {
  const { email, setemail,setloading,loading } = useContext(Appcontext);
  const navigate = useNavigate();
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    let filtered = email.split("@")[1];
    if (!email || filtered !== "gmail.com") {
      toast.error("Enter the valid Email");
    } else {
      try {
        setloading(true)
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/reset-password-token`,
          { email }
        );
        console.log("otp status",response);
       
        toast.success("Otp Sent Successfully");
        navigate("/confirm-email");
      } catch (error) {
        console.log("Error occurred while sending otp");
        
        console.log(error.response?.data||error.message);
        toast.error(error.response.data);
      }
      finally{
        setloading(false)
      }
    }
    console.log("this is filtered", filtered);
  };

  return (
    <div>
      {loading&&<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">Loading...</div>}
      <Navbar />
      <div className="min-h-[85vh]  w-100% flex justify-center items-center">
        <div className="md:max-w-96 max-w-72">
          <h3 className="text-white text-3xl font-semibold">
            Reset Your Password
          </h3>
          <p className="text-slate-500 mt-4">
            Have no fear.We'll email you instructions to reset your password. If
            you dont have access to you email we can try account recovery .
          </p>
          <div className="mt-5">
            <form action="" className="flex flex-col" onSubmit={resetPasswordHandler}>
              <div>
                <label className="text-white" htmlFor="">
                  Email Address <sup className="text-red-600">*</sup>
                </label>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="bg-gray-800 rounded w-full  p-[8px] text-white mt-3"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div
                className={`${loading?"bg-yellow-600":"bg-yellow-500"} rounded py-2 font-semibold cursor-pointer mt-6 text-center`}
              >
                <button> Reset Password</button>
              </div>
            </form>
            <Link to="/">
              <div className="flex items-center gap-2 mt-4 cursor-pointer text-sm">
                <span>
                  <FaArrowLeftLong color="white" />
                </span>
                <span className="text-white">Back to Login</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
