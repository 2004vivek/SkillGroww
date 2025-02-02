import React, { useContext } from 'react'
import ActionButton from '../CoreComponent/Dashboard/ActionButton';
import { useNavigate } from 'react-router-dom';
import { Appcontext } from '../../context/AppContext';
export default function Myprofile() {
    const user=JSON.parse(localStorage.getItem("usertype"));
    const navigate=useNavigate();
    const {imageUrl,profileinfo,loading}=useContext(Appcontext)
  return (
    <div className='text-white text-2xl w-full m-auto '>
      <h3 className='text-white lg:text-3xl font-bold'>My Profile</h3>
      <div className='w-full flex justify-between bg-slate-900 p-5 mt-4 items-center'>
        <div className='flex gap-2 '>
            <div className='rounded-full h-24 w-24 overflow-hidden'><img src={imageUrl} alt="user-image" className='w-full h-full'/></div>
            <div className='text-white text-[18px] font-bold flex flex-col '><div><span>{user.firstName}</span><span>{user.lastName}</span></div>
            <div className='text-[14px] text-slate-400'>{user.email}</div>
            </div>
           
        </div>
        <div onClick={()=>navigate("/dashboard/setting")}><ActionButton text={"Edit"}/></div>
      </div>

      <div className='w-full flex justify-between bg-slate-900 p-5 mt-4 items-center'>
        <div className=''>
            <div className='text-white text-[18px] font-bold flex flex-col '>
               About
            </div>
            <p className='text-[14px] text-slate-400 mt-3'>{profileinfo?.about ?? "Write Something about Yourself!"}</p>
        </div>
        <div onClick={()=>navigate("/dashboard/setting")}><ActionButton text={"Edit"}/></div>
      </div>

      <div className='w-full flex justify-between bg-slate-900 p-5 mt-4 items-center'>
        <div className='w-full'>
            <div className='text-white text-[18px] font-bold flex flex-col '>
               Personal Details
            </div>
            <div className=' mt-3 w-3/4'>
            <table border="1px" className='w-full'>
              <thead>
              <tr>
                <th className='text-[14px] text-slate-400'>First Name</th>
                <th className='text-[14px] text-slate-400'> Last Name</th>
                
              </tr>
              </thead>
             <tbody>
              <tr>
                <td className='text-[14px] text-white'>{user?.firstName}</td>
                <td className='text-[14px] text-white'>{user?.lastName}</td>
              </tr>
              <tr>
                <th className='text-[14px] text-slate-400'>Email</th>
                <th className='text-[14px] text-slate-400'>Phone Number</th>
              </tr>
              <tr>
                <td className='text-[14px] text-white'>{user?.email}</td>
                <td className='text-[14px] text-white'>{profileinfo?.phoneNumber??"Add Contact Number"}</td>
              </tr>
              <tr>
              <th className='text-[14px] text-slate-400'>Gender</th>
              <th className='text-[14px] text-slate-400'>Date of Birth</th>
              </tr>
              <tr>
                <td className='text-[14px] text-white'>{profileinfo?.gender??"Add a gender"}</td>
                <td className='text-[14px] text-white'>{profileinfo?.dob??"Enter your dob"}</td>
              </tr>
              </tbody>
            </table>
            </div>
        </div>
        <div onClick={()=>navigate("/dashboard/setting")}><ActionButton text={"Edit"}/></div>
      </div>
    </div>
  )
}
