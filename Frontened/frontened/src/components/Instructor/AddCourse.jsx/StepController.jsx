import React, { useState } from 'react'
import CourseBuilderForm from './CourseBuilderForm';
import CourseInformationForm from './CourseInformationForm';
import Publish from './Publish';
import { useContext } from 'react';
import { CourseContext} from '../../../context/CourseContext'
import { FaCheckCircle } from "react-icons/fa";
export default function StepController() {

  const {position}=useContext(CourseContext)
  let steps=[
    {
      id:1,
      "name":"Course Information"
    },
    {
      id:2,
      "name":"Course Builder"
    },
    {
      id:3,
      "name":"Publish"
    }
  ]
  return (
    <div className='mt-4'>
      <div className='w-full flex text-[16px] justify-evenly  font-bold m-auto border'>
      {
        steps.map((step)=>(
          <div className='place-items-center'>
            
            {position>step.id?(<div className='w-[34px] border rounded-full'><FaCheckCircle className='h-full w-full text-blue-600'/></div>):<div className={`w-[36px] ${step.id===position?"bg-[hsl(180,100%,77%)] text-blue-600 border-2 border-dashed border-blue-600":"bg-slate-700"}   rounded-full font-bold  text-center`}>{(step.id)}</div>}
            
            <div >{step.name}</div>
       
          </div>

        ))
      }
    
      </div>
      <div className='w-full mt-4 bg-slate-900 rounded-md p-4'>
        {position==1&&<CourseInformationForm/>}
        {position==2&&<CourseBuilderForm/>}
        {position==3&&<Publish/>}
      </div>
    </div>
  )
}
