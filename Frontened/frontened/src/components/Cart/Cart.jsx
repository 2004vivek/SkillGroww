import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import CartCard from "./CartCard";
import { Appcontext } from "../../context/AppContext";
import { CourseContext } from "../../context/CourseContext";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

export default function Cart() {
  const userdetails = JSON.parse(localStorage.getItem("usertype"));
  const userid = userdetails._id;
  const token = localStorage.getItem("token");

  const [cartid, setcartid] = useState("");

  const {cartitem,setcartitem,settotalprice,totalprice,discountprice,setdiscountprice,loader,setloader} = useContext(CourseContext);

  let baseurl = import.meta.env.VITE_API_BASE_URL;
  console.log("this is baseurl",baseurl)

  const getallcart = async () => {
    try {
      setloader(true);
      const response = await axios.get(`${baseurl}/api/v1/cart/get-all-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setcartid(response.data.cartid._id);
      setcartitem(response.data.cartitem);
    } catch (error) {
      console.log(
        "Error fetching cart:",
        error?.response?.data || error?.message
      );
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    getallcart();
  }, []);

  useEffect(() => {
    let total = cartitem.reduce(
      (sum, product) => sum + parseInt(product.price),
      0
    );
    settotalprice(total);

    const totalDiscount = cartitem.reduce((total, product) => {
      const discountPrice =
        parseInt(product.price) - (product.price * 10) / 100;
      return total + discountPrice;
    }, 0);

    setdiscountprice(totalDiscount);
  }, [cartitem]);

  const handlePayment = async () => {
    try {
      const stripe = await loadStripe("pk_test_51QSifpEZj9co3L2BbdcWAV8hYQoauxstmYUoTk1c2qsXoB1jhMDM5aix7ymmLGwQ4cgLQhG23ZlVPXDpqCJvenSP00vU5n6CpL");

      const response = await axios.post(
        `${baseurl}/api/v1/payment/transaction`,
        {
          cartitem: cartitem,
          discountprice: discountprice,
          userid: userid,
          cartitemid: cartid,
        }
      );

      const result = stripe.redirectToCheckout({ sessionId: response.data.id });

      if (result.error) {
        console.log("Stripe redirect error", result.error);
      }
    } catch (error) {
      console.log(
        "Error during checkout:",
        error?.response?.data || error?.message
      );
      toast.error(error?.response?.data || error?.message);
    }
  };

  return (
    <div className="text-white w-full max-w-6xl mx-auto px-4">
      <h3 className="text-white text-2xl md:text-3xl font-bold">My Cart</h3>

      {loader ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">
          Loading...
        </div>
      ) : (
        <>
          {cartitem?.length === 0 ? (
            <div className="mt-6 text-white">No item in cart</div>
          ) : (
            <>
              <div className="text-lg mt-4 text-slate-400">
                {cartitem?.length || 0} courses in cart
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-3/4 w-full   mt-4 p-3 rounded-lg">
                  {cartitem?.map((cart, index) => (
                    <CartCard key={index} cart={cart} />
                  ))}
                </div>

                <div className="md:w-1/4 w-full h-auto md:h-[250px] border-dashed border bg-gray-900 border-slate-500 mt-4 rounded-md p-4">
                  <div className="text-lg text-slate-400">Total:</div>
                  <div className="text-2xl text-yellow-500 font-bold">
                    Rs. {discountprice}
                  </div>
                  <div className="text-lg text-slate-400 line-through">
                    Rs. {totalprice}
                  </div>
                  <button
                    className="w-full py-2 rounded-md mt-6 bg-yellow-400 text-black font-bold text-lg"
                    onClick={handlePayment}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
