import React, { useContext } from "react";
import Navbar from "../components/CoreComponent/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Appcontext } from "../context/AppContext";
export default function Login() {
  const { SymbolHandler, showpassword,loginFormHandler,onchangeLoginHandler,loading,logoutHandler, imageUrl} = useContext(Appcontext);

  const navigate=useNavigate();

  return (
    <div>
      <Navbar />
      {loading?
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">Loading...</div>:
      <>
           <div className="text-white mt-5 flex xl:w-[77%] lg:w-[85%] w-[85%] m-auto flex-col-reverse md:flex-row min-h-[80vh] items-center ">
        <div className="left w-[50%]  max-md:w-auto space-y-3 ">
          <div className="space-y-3">
          <h2 className="font-bold md:text-3xl text-2xl">Welcome Back</h2>
          <p className="text-gray-400 md:text-[1.1rem] text-[0.99rem]">
            Build skills for today,tomorrow, and beyond.
          </p>
          <span className="slogan text-blue-300 md:text-3xl text-2xl">
            Education to future proof your carrer.
          </span>

          </div>
         
          <div>
            <form action="" onSubmit={(e)=>loginFormHandler(e,navigate)}>
              <div className="mb-4">
                <div className="text-white text-sm mt-2 font-sans mb-2">
                  <label htmlFor="">
                    Email Address<sup className="text-red-500"> *</sup>
                  </label>
                </div>
                <div>
                  <input
                    className="bg-gray-800 rounded lg:w-[60%] w-11/12   p-[8px] text-white"
                    type="email"
                    name="email"
                    required
                    onChange={onchangeLoginHandler}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="text-white text-sm mt-2 font-sans mb-2">
                <label htmlFor="">
                  Password<sup className="text-red-500"> *</sup>
                </label>
              </div>
              <div className="relative lg:w-[60%] w-11/12  ">
                <input
                  type={showpassword ? "text" : "password"}
                  className="bg-gray-800 rounded p-[8px] text-white w-full pr-7"
                  name="password"
                  onChange={onchangeLoginHandler}
                  required
                  placeholder="Enter password"
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
                <div className="mb-4 absolute right-0">
                  <Link to="/reset-password" className="text-sm text-blue-500 w-full mx-auto ">
                    Forgot Password
                  </Link>
                </div>
              </div>

              <button className={`lg:w-[60%] w-11/12 py-2 ${loading?"bg-yellow-600":"bg-yellow-500"} text-black rounded-md mt-11 font-medium lg:font-bold`} onClick={logoutHandler}>
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="right md:w-[50%] w-auto lg:m-0 m-5  ">
          <div className=" flex justify-end items-center">
            <div className="xl:w-[350px] w-[200px] md:w-[220px] relative"><img src="back-login.jpg" alt="back-login" />
            <div className="absolute xl:w-[350px] w-[200px] md:w-[220px] bottom-4 right-4"> <img src="cover-login.jpg" alt="cover-login" /></div>
            </div>
           
          </div>
        </div>
      </div>
      </>
      
      }
 
    </div>
  );
}
