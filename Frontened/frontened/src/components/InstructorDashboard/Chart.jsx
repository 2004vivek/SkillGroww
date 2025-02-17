import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({ enrolledcourse, totalstudent, totalcourses, totalamountrecieve }) {
    const [currchart, setcurrchart] = useState("students");

    const labels = enrolledcourse?.map(course => course?.coursename);
    const studentCounts = enrolledcourse?.map(course => course?.studentEnrolled?.length);
    
    let revenue = enrolledcourse?.map((course) => (
        parseInt(course.price) * course?.studentEnrolled?.length
    ));

    const data = {
        labels: labels,
        datasets: [{
            label: "Students Enrolled",
            data: studentCounts,
            backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
            hoverOffset: 10,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    usePointStyle: true,
                    boxWidth: 15,
                    padding: 15,
                    font: { size: 14 },
                    // whiteSpace: 'nowrap',
                },
                position: "bottom",
                align: "center",
            },
        },
    };

    const revenuedata = {
        labels: labels,
        datasets: [{
            label: "Total Revenue",
            data: revenue,
            backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
            hoverOffset: 10,
        }],
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full p-4 ">
        
            <div className="w-full md:w-[70%] bg-slate-900 p-4  rounded-lg shadow-lg">
                <p className="font-bold lg:text-[18px] md:text-[16px] text-[14px]  text-white">Visualize</p>
                <div className="flex gap-4 mt-4 ">
                    <button 
                        className={`font-bold lg:p-2 p-1 lg:text-[16px] text-[14px]  rounded-md transition-all ${currchart === "students" ? "bg-[#ffff2d] text-black" : "text-white"}`}
                        onClick={() => setcurrchart("students")}
                    >
                        Students
                    </button>
                    <button 
                        className={`font-bold lg:p-2 p-1 lg:text-[16px] text-[14px] rounded-md transition-all ${currchart === "income" ? "bg-[#ffff2d] text-black" : "text-white"}`}
                        onClick={() => setcurrchart("income")}
                    >
                        Income
                    </button>
                </div>

            
                <div className="w-full flex justify-center">
                    <div className="w-full max-w-[400px] h-[350px] p-4">
                        {currchart === "students" && (
                            <>
                                <h2 className="text-white text-center lg:text-[26px] md:text-[18px] text-[16px] font-bold mb-4 ">Student Enrollment</h2>
                                <Doughnut data={data} options={options} />
                            </>
                        )}
                        {currchart === "income" && (
                            <>
                                <h2 className="text-white text-center lg:text-[26px] md:text-[18px] text-[16px]  font-bold mb-4">Total Revenue</h2>
                                <Doughnut data={revenuedata} options={options} />
                            </>
                        )}
                    </div>
                </div>
            </div>

          
            <div className="w-full md:w-[30%] bg-slate-900 p-4 rounded-lg shadow-lg text-center md:text-left">
                <div className="font-bold lg:text-[26px] md:text-[18px] text-[16px]  text-white ">Statistics</div>
                
                <div className="mt-6 text-yellow-400 font-bold lg:text-[20px] md:text-[18px] text-[14px]">Total Courses</div>
                <div className="font-bold lg:text-[22px] md:text-[20px] text-[16px] text-white ">{totalcourses}</div>
                
                <div className="mt-6 text-yellow-400 font-bold lg:text-[20px] md:text-[18px] text-[14px]">Total Students</div>
                <div className="font-bold lg:text-[22px] md:text-[20px] text-[16px] text-white">{totalstudent}</div>
                
                <div className="mt-6 text-yellow-400 font-bold lg:text-[20px] md:text-[18px] text-[14px]">Total Income</div>
                <div className="font-bold lg:text-[22px] md:text-[20px] text-[16px] text-white">Rs. {totalamountrecieve}</div>
            </div>

        </div>
    );
}
