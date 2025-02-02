import React from 'react'
import aboutstatsdata from '../../../data/aboutstatsdata'
export default function AboutStats() {
  return (
    
        <div className='flex  w-full justify-evenly bg-gray-800 py-4'>
          {aboutstatsdata.map((data,index)=>(
            <div key={index} className={`text-slate-400 ${index===0?"hidden sm:block":"sm:block"}  flex flex-col justify-evenly`}>
            <div>{data.count}</div>
            <div>{data.label}</div>
            </div> 
          ))}
        </div>
     
  )
}
