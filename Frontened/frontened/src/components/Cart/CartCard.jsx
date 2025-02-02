import axios from "axios";
import React, { useContext } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { CourseContext } from "../../context/CourseContext";
export default function CartCard({ cart }) {
    const {removeCarthandler,totalprice}=useContext(CourseContext);
  return (
    <div className="w-full flex bg-white/10 py-5  px-3 rounded-md border mb-4">
      <div className="w-full gap-3 flex items-center text-slate-400 font-semibold ">
        <div className="w-[150px] h-[120px] rounded-md overflow-hidden border ">
          <video
            src={cart?.thumbnails}
            alt="cart"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-[85%] ">
          <h3 className="text-white text-[18px] font-bold">{cart?.coursename}</h3>
          <p className="text-slate-400 text-[14px]">
            {cart?.coursedescription}
          </p>
          <p className="text-white text-[14px]">
            {cart?.instructor?.firstName} {cart?.instructor?.lastName}
          </p>
          <div className="text-white text-[14px] flex gap-2 items-center">
            <ReactStars
              count={5}
              value={cart?.ratingandreview?.length}
              size={20}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              edit={false}
            />
            {cart?.ratingandreview?.length||0} ratings 
          </div>

        </div>
      </div>
     
      <div className="w-[20%] mt-4">
        <div className="text-[18px] text-red-500 bg-slate-800 text-center mb-4 rounded-md cursor-pointer flex items-center justify-center gap-2" onClick={()=>removeCarthandler(cart._id)}><RiDeleteBin5Line />Remove</div>
      <div className="text-[22px] text-yellow-500 text-center">Rs. {cart?.price}</div>
       
      </div>
    </div>
  );
}
