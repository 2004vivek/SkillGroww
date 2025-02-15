import React, { useContext } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { CourseContext } from "../../context/CourseContext";

export default function CartCard({ cart }) {
  const { removeCarthandler } = useContext(CourseContext);

  return (
    <div className="w-full flex flex-col md:flex-row bg-white/10 py-4 px-3 rounded-md border border-slate-500 mb-4">
      <div className="w-full md:w-[150px] h-[120px] rounded-md overflow-hidden  mb-3 md:mb-0">
        <video src={cart?.thumbnails} className="h-full w-full object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between md:ml-2">
        <h3 className="text-white text-lg font-bold">{cart?.coursename}</h3>
        <p className="text-slate-400 text-sm">{cart?.coursedescription}</p>
        <p className="text-white text-sm">
          {cart?.instructor?.firstName} {cart?.instructor?.lastName}
        </p>

        <div className="text-white text-sm flex gap-2 items-center mt-2">
          <ReactStars
            count={5}
            value={cart?.ratingandreview?.length}
            size={18}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            edit={false}
          />
          {cart?.ratingandreview?.length || 0} ratings
        </div>
      </div>

      <div className="flex flex-col items-center justify-between mt-4 md:mt-0 md:ml-4">
        <button
          className="text-red-500 bg-transparent border-gray-500 border-2 md:px-4 md:py-2 py-1 px-3 rounded-md flex items-center gap-2 max-md:mb-2"
          onClick={() => removeCarthandler(cart._id)}
        >
          <RiDeleteBin5Line />
          Remove
        </button>
        <div className="md:text-[22px] font-bold text-yellow-500">Rs. {cart?.price}</div>
      </div>
    </div>
  );
}
