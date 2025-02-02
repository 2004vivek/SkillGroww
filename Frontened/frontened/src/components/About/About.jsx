import React from "react";
import Navbar from "../CoreComponent/Navbar";
import AboutStats from "../About/AboutStats";
import Learning from "./Learning";
import ContactUs from "../Contacts/ContactUs";
export default function About() {
  return (
    <>
      <Navbar />
      <div className="w-11/12 m-auto  flex flex-col justify-center items-center mt-4">
        {/* section 1 */}
        <section className=" w-full flex flex-col items-center">
          <div className="xl:w-1/2  w-auto text-white text-2xl xl:text-3xl font-bold mb-3">
            <h3 className="text-center">
              Driving Innovation in Online Education for a{" "}
            </h3>
            <h3 className=" font-bold  text-center bg-gradient-to-b from-sky-300 via-purple-400  to-blue-500 bg-clip-text text-transparent">
              Brighter Future
            </h3>
          </div>
          <div className="xl:w-9/12  w-auto text-slate-400 mt-2 md:text-center   mb-5">
            <p>
              Study Grow is at forefront of driving in online education.We're
              passionate about creating a brighter future by offering
              cutting-edge courses,leveraging emerging technologies, and
              nurturing a vibrant learning community.
            </p>
          </div>
          <div className="w-[95%]  text-slate-400 mt-2 flex   flex-wrap gap-10 xl:gap-0  justify-evenly mb-12">
            <div className="lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] w-[250px] h-[250px]  rounded-md overflow-hidden">
              <img
                src="about-pic1.jpg"
                className="w-full h-full"
                alt="aboutpic1"
              />
            </div>
            <div className="lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] w-[250px] h-[250px]  rounded-md overflow-hidden">
              <img
                src="about-pic2.png"
                className="w-full h-full"
                alt="aboutpic2"
              />
            </div>
            <div className="lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] w-[250px] h-[250px]  rounded-md overflow-hidden">
              <img
                src="about-pic-3.jpg"
                className="w-full h-full"
                alt="aboutpic3"
              />
            </div>
          </div>

          <div className="xl:w-[80%] w-auto text-white text-xl xl:text-3xl font-bold mb-8">
            <h3 className="md:text-center">
              <span >
                We are passionate about revolutionizing the way we learn.
              </span>
              <span className="inline-block font-semibold">
              Our innovative platform&nbsp;
              </span>
              <span className="inline-block bg-gradient-to-t from-sky-600 to-slate-300 bg-clip-text text-transparent font-semibold">
                 combines technology,&nbsp;
              </span>
              <span className="inline-block bg-gradient-to-t from-orange-200 to-orange-600 bg-clip-text text-transparent font-semibold">
                expertise,&nbsp;
              </span>
              <span className="inline-block">and community to </span>
              <span className="inline-block"> create an&nbsp;</span>
              <span className="inline-block bg-gradient-to-t from-red-800 via-yellow-300 to-red-500 bg-clip-text text-transparent font-bold">
                unparalleled educational experience.
              </span>
            </h3>

            {/* <h3 className=' font-bold  text-center bg-gradient-to-b from-sky-300 via-purple-400  to-blue-500 bg-clip-text text-transparent'></h3> */}
          </div>
        </section>

        {/* section2 */}
        <section className=" w-11/12 flex flex-col items-center ">
          <div className="w-full  flex md:flex-row flex-col gap-5">
            <div className="md:w-[60%] sm:w-[50%] m-auto">
              <h3 className="text-2xl xl:text-3xl  bg-gradient-to-r from-red-500 via-yellow-600 to-red-700 bg-clip-text text-transparent font-bold mb-3">
                Our Founding Story
              </h3>
              <p className="text-slate-400 mb-5 ">
                Our e-learning platform emerged from a collective vision and
                deep commitment to revolutionizing education. It started with
                educators, technologists, and lifelong learners who identified
                the need for accessible, adaptable, and high-quality learning
                opportunities in today's rapidly changing digital landscape.
              </p>
              <p className="text-slate-400 ">
                As educators, we experienced the challenges of conventional
                education systems firsthand. We believed learning should not be
                limited to physical classrooms or constrained by geography. Our
                goal was to create a platform that bridges these gaps and
                empowers individuals from all backgrounds to reach their full
                potential.
              </p>
            </div>
            <div className="md:w-[40%] sm-[50%] m-auto flex justify-end items-center">
              <div className="lg:h-[220px] lg:w-[370px] sm:h-[190px] sm:w-[340px] relative">
                <img
                  src="vision.jpg"
                  alt="vision"
                  className="h-full w-full rounded-md shadow-[0_0_10px_5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_10px_rgba(255,255,255,0.5)] transition duration-500"
                />
                <div className="absolute inset-1 rounded-md bg-gradient-to-r from-white/5 to-transparent blur-md opacity-60"></div>
              </div>
            </div>
          </div>
          <div className="w-full  flex flex-wrap justify-center items-center mt-24 mb-10 ">
            <div className="md:w-1/2 w-auto pr-4">
              <h3 className="text-2xl xl:text-3xl  bg-gradient-to-t from-orange-500  via-yellow-300 to-orange-700 bg-clip-text text-transparent font-bold mb-4">
                Our Vision
              </h3>
              <p className="text-slate-400 mb-5 ">
                Our online learning platform was created with a shared vision
                and strong dedication to transforming education. It began with a
                team of educators, technology experts, and lifelong learners who
                recognized the importance of providing flexible, accessible, and
                top-quality learning opportunities in an ever-evolving digital
                world.
              </p>
            </div>
            <div className="md:w-1/2 w-auto">
              <h3 className="text-2xl xl:text-3xl  bg-gradient-to-r from-sky-500 via-slate-300 to-blue-700 bg-clip-text text-transparent font-bold mb-4">
                Our Mission
              </h3>
              <p className="text-slate-400 md:mb-5 ">
                Our mission extends far beyond simply offering online courses.
                We aim to build an active and dynamic learning community where
                individuals can connect, work together, and grow by learning
                from one another. We believe that knowledge flourishes in an
                environment of collaboration and shared experiences.
              </p>
            </div>
          </div>
        </section>

        {/* section3 */}
        <section className=" w-11/12 flex flex-col items-center md:mb-8 mb-6">
          <AboutStats />
        </section>

        {/* section4 */}
        <section className=" w-11/12 flex items-center">
          <Learning />
        </section>

        {/* section5 */}
        <section className=" w-full flex flex-col items-center justify-center mt-10">
        <div className="md:w-1/2 w-auto">
        <h3 className="text-2xl xl:text-3xl  text-white text-center font-semibold mb-4">Get In Touch</h3>
        <p className="text-slate-400 md:text-center text-left mb-4">We'd love to here from you.Please fill out this form</p>
        <ContactUs/>
        </div>
        </section>
      </div>
      
    </>
  );
}
