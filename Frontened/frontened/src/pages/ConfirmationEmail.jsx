import React, { useContext, useState } from 'react'
import Navbar from "../components/CoreComponent/Navbar";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Appcontext } from '../context/AppContext';
export default function ConfirmationEmail() {
  const {email}=useContext(Appcontext)
  return (
    <div>
      <Navbar />
      <div className="min-h-[85vh]  w-100% flex justify-center items-center">
        <div className="md:max-w-96 max-w-72">
          <h3 className="text-white text-3xl font-semibold">
            Check Email
          </h3>
          <p className="text-slate-500 mt-4">
            We have sent the reset email to {email}
          </p>
          <div className="mt-5">
          <Link to=""><div className="bg-yellow-400 rounded py-2 font-semibold cursor-pointer mt-6 text-center"><button >Resend Email</button></div></Link>
           <Link to="/"> <div className="flex items-center gap-2 mt-4 cursor-pointer text-sm">
                <span><FaArrowLeftLong color="white"/></span><span className="text-white">Back to Login</span>
            </div></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
