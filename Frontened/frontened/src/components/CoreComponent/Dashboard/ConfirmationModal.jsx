import React, { useContext } from "react";
import { Appcontext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function ConfirmationModal({ showmodal, onclose,heading,content,btn1text,btn2text,btn1handler,btn2handler }) {
  if (!showmodal) return null;

  return (
    <div
      className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
    >
      <div className="modal-dialog md:w-full w-11/12 max-w-sm mx-auto bg-slate-800 rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-header flex justify-between items-center p-4 border-gray-700">
            <h4 className="modal-title text-white font-bold text-2xl">{heading}</h4>
            <button
              type="button"
              className="close text-white text-2xl"
              onClick={onclose}
            >
              &times;
            </button>
          </div>
          <div className="modal-body p-2 text-gray-300 text-[14px] font-medium">
            <p>{content}</p>
          </div>
          <div className=" flex p-4 gap-3 border-gray-700">
            <button
              type="button"
              className="btn bg-yellow-500 text-black font-bold px-4 py-2 rounded hover:bg-yellow-600"
              onClick={btn1handler}
            >
             {btn1text}
            </button>

            <button
              type="button"
              className="btn bg-gray-300 text-black font-bold px-4 py-2 rounded hover:bg-gray-600"
              onClick={btn2handler}
            >
             {btn2text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
