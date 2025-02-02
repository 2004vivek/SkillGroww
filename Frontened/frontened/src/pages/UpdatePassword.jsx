import React from "react";
import Navbar from "../components/CoreComponent/Navbar";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useContext } from "react";
import { Appcontext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function UpdatePassword() {
    const { SymbolHandler, showpassword,showpassword1,ConfirmSymbolHandler,onchangeupdateHandler,setupdatefield,updatefield,loading,setloading} = useContext(Appcontext);
    const location=useLocation()

    const passwordreset=async(updatefield)=>{
      console.log("this is data which i want",updatefield)
      setloading(true)
      try {
        const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/reset-password`,updatefield)
        console.log("try",response)
        if(response.data.success===true){
          toast.success(response.data.message)
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log("catch",error.response?.data||error.message)
        toast.error("unable to reset the password");
      }
      finally{
        setloading(false)
      }
    }
    const UpdatePasswordHandler=(e)=>{
      e.preventDefault();
      const token=location.pathname.split("/").at(-1)
      console.log(token)
      setupdatefield((prev)=>({...prev,token}))
      passwordreset(updatefield);
      console.log(updatefield)
    }
  return (
    <div>
        {loading&&<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">Loading...</div>}
      <Navbar />
      <div className="min-h-[85vh]  w-100% flex justify-center items-center">
        <div className="md:max-w-96 max-w-72">
          <h3 className="text-white md:text-3xl text-2xl font-semibold">
            Choose New Password
          </h3>
          <p className="text-slate-500 mt-4">
            Almost done.Enter your new password and you are all set
          </p>

         
         <form action="" onSubmit={UpdatePasswordHandler}>

          <div className="text-white text-sm mt-2 font-sans mb-2">
            <label htmlFor="">
              New Password<sup className="text-red-500"> *</sup>
            </label>
          </div>
          <div className="relative  ">
            <input
              type={showpassword ? "text" : "password"}
              className="bg-gray-800 rounded p-[8px] text-white w-full pr-7"
              name="password"
              onChange={onchangeupdateHandler}
              required
              placeholder="Enter new password"
              />
            <span
              className="absolute top-2 right-1 text-white"
              onClick={SymbolHandler}
              >
              {showpassword ? (
                <IoIosEye fontSize={"20px"} />
              ) : (
                <IoIosEyeOff fontSize={"20px"} />
              )}
            </span>
          </div>

          <div className="text-white text-sm mt-2 font-sans mb-2">
            <label htmlFor="">
              Confirm Password<sup className="text-red-500"> *</sup>
            </label>
          </div>
          <div className="relative  ">
            <input
              type={showpassword1 ? "text" : "password"}
              className="bg-gray-800 rounded p-[8px] text-white w-full pr-7 border"
              name="confirmpassword"
              onChange={onchangeupdateHandler}
              required
              placeholder="Enter confirm password"
              />
            <span
              className="absolute top-2 right-1 text-white ml-11 "
              onClick={ConfirmSymbolHandler}
            >
              {showpassword1 ? (
                <IoIosEye fontSize={"20px"} />
              ) : (
                <IoIosEyeOff fontSize={"20px"} />
              )}
            </span>
          </div>

          <div className="mt-5">
           
              <div className={`${loading?"bg-yellow-600":"bg-yellow-500"} rounded py-2 font-semibold cursor-pointer mt-6 text-center`}>
                <button>Reset Password</button>
              </div>
           
            <Link to="/">
              {" "}
              <div className="flex items-center gap-2 mt-4 cursor-pointer text-sm">
                <span>
                  <FaArrowLeftLong color="white" />
                </span>
                <span className="text-white">Back to Login</span>
              </div>
            </Link>
          </div>
              </form>

          
        </div>
      </div>
    </div>
  );
}
