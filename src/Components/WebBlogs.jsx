/* eslint-disable no-unused-vars */
import React from "react";
import farmerImg from "../assets/farmer-blog.jpg";
import {
  FaSeedling,
  FaShoppingCart,
  FaUserCheck,
  FaChartLine,
  FaFolderOpen,
} from "react-icons/fa";

const WebBlogs = () => {
  const steps = [
    {
      icon: <FaSeedling size={32} className="text-green-700" />,
      title: "Farmers create an account & list crops",
      desc: "Farmers can easily register and showcase their crops with full details like name, price, location, and quantity.",
    },
    {
      icon: <FaShoppingCart size={32} className="text-green-700" />,
      title: "Buyers browse crops & send interest",
      desc: "Buyers explore crops and send interest requests with quantity and a short message.",
    },
    {
      icon: <FaUserCheck size={32} className="text-green-700" />,
      title: "Farmers review interests & respond",
      desc: "Farmers receive and compare requests before accepting or rejecting.",
    },
    {
      icon: <FaChartLine size={32} className="text-green-700" />,
      title: "Quantity updates automatically",
      desc: "Accepted interests instantly update crop availability.",
    },
    {
      icon: <FaFolderOpen size={32} className="text-green-700" />,
      title: "Track everything in dashboard",
      desc: "Both farmers and buyers manage all activities easily.",
    },
  ];

  return (
    <div className="w-full bg-[#F5F6EF] py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SECTION */}
        <div className="order-2 md:order-1">
          <p className="text-green-700 uppercase tracking-wider mb-2 font-semibold">
            HOW IT WORKS
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 leading-tight text-[#2c4a3e]">
            Simple Process for
            <br /> Farmers & Buyers
          </h2>

          <p className="text-gray-600 mt-4 text-[15px] leading-relaxed">
            Our crop marketplace connects farmers and buyers through an
            effortless, transparent and secure process. Everything happens in
            one place — from listing crops to managing interests.
          </p>

          <div className="mt-10 space-y-6 text-gray-700">
            {steps.map((item, i) => (
              <div key={i} className="flex gap-4">
                {item.icon}
                <div>
                  <h3 className="font-semibold text-xl sm:text-2xl">{item.title}</h3>
                  <p className="text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-10 px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition font-semibold">
            Learn More →
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="order-1 md:order-2 flex justify-center">
          <img
            src={farmerImg}
            alt="Farmer"
            className="w-full max-w-[450px] md:max-w-full h-full object-cover rounded-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default WebBlogs;