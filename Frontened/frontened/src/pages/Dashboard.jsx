import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/CoreComponent/Dashboard/Sidebar'
import Navbar from '../components/CoreComponent/Navbar'
export default function Dashboard() {
  return (
    <>
    <Navbar/>
    <div className='min-h-[calc(100vh-3rem)] flex flex-col lg:flex-row'>
        <Sidebar/>
        <div className='lg:w-[calc(100vw-3rem)] w-[95%] mx-auto border overflow-auto'>
            <div className='lg:w-11/12 mx-auto w-full lg:max-w-[1000px] py-10'>
            <Outlet/>
            </div>
        </div>
      
    </div>
    </>
  )
}
