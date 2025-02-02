import React, { useContext, useState } from "react";
import Navbar from "../components/CoreComponent/Navbar";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import OTPInput from "react-otp-input";
import { Appcontext } from "../context/AppContext";

export default function VerifyEmail() {
  const {otp,EmailVerifysubmitHandler,setotp,setsignupinputfield,signupinputfield}=useContext(Appcontext)
  return (
    <div>
      <Navbar />
      <div className="min-h-[85vh]  w-100% flex justify-center items-center">
        <div className="md:max-w-96 max-w-72">
          <h3 className="text-white text-3xl font-semibold">Verify Email</h3>
          <p className="text-slate-500 mt-4">
            A verification code has send to you.Enter the code below
          </p>
          <div>
            <form action="" onSubmit={EmailVerifysubmitHandler}>
              <OTPInput
                value={signupinputfield.otp}
                onChange={(otp)=>{setsignupinputfield((prev) => ({ ...prev, otp }))}}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="otp-input"
                    style={{
                      width: "55px", 
                      height: "55px", 
                      backgroundColor: "#2d3748",
                      color: "#fff",
                      fontSize: "1.25rem", 
                      textAlign: "center", 
                      border: "2px solid #4a5568", 
                      borderRadius: "8px",
                      margin: "0 5px",
                      marginTop:"15px"
                    }}
                    placeholder="-" 
                  />
                )}
                inputType="tel"
                shouldAutoFocus 
                inputStyle={{
                  outline: "none", 
                }}
                // containerStyle={{
                //   display: "flex", 
                // }}
              />
               
              <div className="bg-yellow-400 rounded py-2 font-semibold cursor-pointer mt-6 text-center">
                <button >Verify Email</button>
              </div>
            </form>
          </div>
          <Link to=""><div className="bg-yellow-400 rounded py-2 font-semibold cursor-pointer mt-6 text-center"><button >Resend Email</button></div></Link>
          <div className="mt-5">
          
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
