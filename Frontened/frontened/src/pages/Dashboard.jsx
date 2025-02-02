import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/CoreComponent/Dashboard/Sidebar'
import Navbar from '../components/CoreComponent/Navbar'
export default function Dashboard() {
  return (
    <>
    <Navbar/>
    <div className='min-h-[calc(100vh-3rem)] flex '>
        <Sidebar/>
        <div className='w-[calc(100vw-3rem)] border overflow-auto'>
            <div className='w-11/12 mx-auto max-w-[1000px] py-10'>
            <Outlet/>
            </div>
        </div>
      
    </div>
    </>
  )
}
