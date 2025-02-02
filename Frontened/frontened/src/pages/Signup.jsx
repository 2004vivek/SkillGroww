import React, { useContext } from "react";
import Navbar from "../components/CoreComponent/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Appcontext } from "../context/AppContext";
import { toast } from "react-toastify";
export default function Signup() {
  const { SymbolHandler, showpassword, accounttype, setaccounttype , signupinputfield, signuponChangeHandler,loading,showpassword1, ConfirmSymbolHandler,setloading,email,setemail} =useContext(Appcontext);

  const navigate=useNavigate()
  //function to handle signup form
  const signupFormHandler=async(e)=>{
    e.preventDefault()
    setloading(true);
    try {
        const {email}=signupinputfield;
        const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/sendotp`,{email})
        setemail(email);
        console.log("hi",response.data);
        toast.success("Otp Sent Successfully");
        navigate("/verify-email")
    } catch (error) {
        console.log("Error occurred while sending otp",);
        console.log(error.response?.data||error.message)
        toast.error(error.response.data)
    }
    finally{
      setloading(false);
    }
    e.target.reset()
   }
  console.log(loading)
  return (
    <div>
      <Navbar />
      <div className="text-white mt-5 flex xl:w-[77%] lg:w-[85%] w-[85%] m-auto flex-col-reverse md:flex-row min-h-[80vh] items-center relative">
        <div className="left w-[50%]  max-md:w-auto space-y-3 ">
          <div className="space-y-3">
            <h2 className="font-bold md:text-3xl text-2xl">
              Join the millions learning to code with SkillGrow for free.
            </h2>
            <p className="text-gray-400 md:text-[1.1rem] text-[0.99rem]">
              Build skills for today,tomorrow, and beyond.
            </p>
            <span className="slogan text-blue-300 md:text-3xl text-2xl">
              Education to future proof your carrer.
            </span>
          </div>
          <div className="max-w-fit flex rounded-full h-[44px] bg-gray-800 mt-4 justify-evenly box">
            <button
              onClick={() => setaccounttype("Student")}
             
              className={`text-md text-white  px-3 m-1 rounded-full ${
                accounttype === "Student"
                  ? "bg-slate-700 text-white"
                  : "bg-transparent"
              } transition-all duration-200`}
            >
              Student
            </button>
            <button
              onClick={() => setaccounttype("Instructor")}
              name="role"
              value="instructor"
              className={`text-md text-white  px-3 m-1 rounded-full ${
                accounttype === "Instructor"
                  ? "bg-slate-700 text-white"
                  : "bg-transparent"
              } transition-all duration-200`}
            >
              Instructor
            </button>
          </div>
          
            {loading&&<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">Loading...</div>}
            <div>
            <form action="" onSubmit={signupFormHandler}>
        
              <div className="mb-4">
                <div className="text-white text-sm mt-2 font-sans mb-2 flex ">
                  <div className=" xl:w-[42%] w-auto">
                    <label htmlFor="">
                      First Name<sup className="text-red-500"> *</sup>
                    </label>
                    <input
                      className="bg-gray-800 rounded md:w-3/4 w-[86%]  p-[8px] text-white mt-2"
                      type="text"
                      name="firstName"
                      required
                      placeholder="Enter First Name"
                      onChange={ signuponChangeHandler}
                    />
                  </div>
                  <div className=" xl:w-[42%] w-auto">
                    <label htmlFor="">
                      Last Name<sup className="text-red-500"> *</sup>
                    </label>
                    <input
                      className="bg-gray-800 rounded lg:w-3/4 w-[86%]  p-[8px] text-white mt-2"
                      type="text"
                      name="lastName"
                      required
                      placeholder="Enter Last Name"
                      onChange={ signuponChangeHandler}
                    />
                  </div>
                </div>
                <div className="text-white text-sm mt-3 font-sans mb-2">
                  <label htmlFor="">
                    Email Address<sup className="text-red-500"> *</sup>
                  </label>
                </div>

                <input
                  className="bg-gray-800 rounded lg:w-[87%] xl:w-[73%] w-11/12 p-[8px] text-white"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter email address"
                  onChange={ signuponChangeHandler}
                />
                <div className="text-white text-sm mt-3 font-sans mb-2">
                  <label htmlFor="">
                    Phone Number<sup className="text-red-500"> *</sup>
                  </label>
                </div>

                <input
                  className="bg-gray-800 rounded lg:w-[87%] xl:w-[73%] w-11/12   p-[8px] text-white"
                  type="tel"
                  name="Phone"
                  required
                  placeholder="Enter mobile number"
                  onChange={ signuponChangeHandler}
                />
                <div className="flex mt-3  flex-col lg:flex-row ">
                  <div className="flex flex-col w-auto lg:w-[45%] xl:w-[43%] text-sm ">
                    <div className="">
                      <label htmlFor="">
                        Create Password <sup className="text-red-500">*</sup>
                      </label>
                    </div>
                    <div className=" lg:w-auto w-11/12">
                    <div className="xl:w-[70%] lg:w-[91%] max-lg:w-full  relative">
                    <input
                        className="bg-gray-800 rounded w-full p-[8px] text-white mt-2 pr-7"
                        type={showpassword?"text":"password"}
                        name="password"
                        required
                        placeholder="Enter Password"
                        onChange={ signuponChangeHandler}
                      />
                      <span
                        className="absolute top-4 right-1 text-white"
                        onClick={SymbolHandler}
                      >
                        {showpassword ? (
                          <IoIosEye fontSize={"20px"} />
                        ) : (
                          <IoIosEyeOff fontSize={"20px"} />
                        )}
                      </span>
                    </div>
                    
                    </div>
                  </div>

                  <div className="flex flex-col  w-auto lg:w-[45%] xl:w-[43%] text-sm  lg:mt-0 mt-3">
                    <div>
                      <label htmlFor="">
                        Confirm Password{" "}
                        <sup className="text-red-500 mt-12">*</sup>
                      </label>
                    </div>
                    <div className=" lg:w-auto w-11/12">
                         <div className="xl:w-[70%] lg:w-[91%] max-lg:w-full  relative">
                      <input
                        className="bg-gray-800 rounded p-[8px] text-white mt-2 w-full pr-7"
                        type={showpassword1?"text":"password"}
                        name="confirmpassword"
                        required
                        placeholder="Enter Password"
                        onChange={signuponChangeHandler}
                      />
                         <span
                        className="absolute top-4 right-1 text-white"
                        onClick={ ConfirmSymbolHandler}
                      >
                        {showpassword1 ? (
                          <IoIosEye fontSize={"20px"} />
                        ) : (
                          <IoIosEyeOff fontSize={"20px"} />
                        )}
                      </span>
                    </div>
                    </div>
                  
                  </div>
                </div>
              </div>
              <button className={`lg:w-[73%] w-11/12 py-2 ${loading?"bg-yellow-600":"bg-yellow-500"}  text-black rounded-md mt-5 font-medium lg:font-bold mb-3`} disabled={loading}>
                Create Account
              </button>
            </form>
          </div>
         
        </div>
        <div className="right md:w-[50%] w-auto lg:m-0 m-5 ">
          <div className=" flex justify-end items-center">
            <div className="xl:w-[350px] w-[200px] md:w-[220px] relative">
              <img src="back-login.jpg" alt="back-login" />
              <div className="absolute xl:w-[350px] w-[200px] md:w-[220px] bottom-4 right-4">
                {" "}
                <img src="cover-login.jpg" alt="cover-login" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
