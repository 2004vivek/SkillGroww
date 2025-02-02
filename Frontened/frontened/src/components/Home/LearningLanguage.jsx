import React from 'react'
import ActionButton from '../CoreComponent/ActionButton'
export default function LearningLanguage() {
  return (
    <div className="lg:w-[85%] w-[90%] m-auto  flex justify-center mt-16 flex-col items-center">
         <div className="text-black  font-bold mb-3">
            <h3 className="text-center mt-4 md:text-2xl text-[20px] xl:text-3xl ">
              Your swiss knife for{" "}
              <span className=" font-bold  text-center bg-gradient-to-b from-sky-300 via-purple-400  to-blue-500 bg-clip-text text-transparent">
                learning any language
              </span>
            </h3>
          </div>

          <div className="xl:w-[68%]  w-auto text-black mt-2 md:text-center font-medium">
            <p className='xl:text-[16px] text-[14px]'>
             Using spin making learning multiple languages easy with 20+ languages,realistic,voice-over,progress tracking custom schedule and more.
            </p>
          </div>

          <div className='flex justify-evenly md:flex-row flex-col items-center mt-4 w-full'>
            <div className='h-[200px] w-[300px] lg:h-[250px] lg:w-[350px]'> <img src="calendar.png" alt="calendar"  className='h-full w-full rounded'/></div>
            <div className='h-[200px] w-[300px] lg:h-[250px] lg:w-[350px]'> <img src="plan-lesson.jpeg" alt="planlesson"  className='h-full w-full rounded'/></div>
            <div className='h-[200px] w-[300px] lg:h-[250px] lg:w-[350px]'> <img src="dashboard.jpeg" alt="dashbard"  className='h-full w-full rounded'/></div>
          </div>
          <div className='mt-6 mb-6'>
          <ActionButton active={true} linkto={"/signup"}>
            Learn More 
          </ActionButton>
            </div>
           
    </div>
  )
}
