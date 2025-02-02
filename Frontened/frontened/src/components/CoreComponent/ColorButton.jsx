import React from 'react'

export default function ColorButton({text}) {
  return (
   <>
   <span className="inline-block bg-gradient-to-t from-sky-600 to-slate-300 bg-clip-text text-transparent md:text-2xl text-[20px] xl:text-3xl">
                {text}
              </span>
   </>
  )
}
