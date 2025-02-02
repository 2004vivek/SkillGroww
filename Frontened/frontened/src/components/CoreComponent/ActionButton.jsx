import React from 'react'
import { Link } from 'react-router-dom'
export default function ActionButton({children,active,linkto}) {
  return (
    <button className={`py-2 px-5 ${active?"text-black bg-yellow-400":"text-white bg-slate-700"} md:text-[16px] text-[12px] rounded-md font-semibold hover:scale-95 transition-all duration-200 cursor-pointer`}>
      <Link to={linkto}>{children}</Link>
    </button>
  )
}
