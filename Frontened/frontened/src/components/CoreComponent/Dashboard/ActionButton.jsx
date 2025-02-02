import React from 'react'
import { FiEdit } from "react-icons/fi";
export default function ActionButton({text}) {
  return (
    <div className='px-2 bg-yellow-400 text-black font-semibold rounded-lg cursor-pointer'>
      <span className='flex text-[16px] place-items-center gap-2 '>{text} <FiEdit fontSize="16px"/></span>
    </div>
  )
}
