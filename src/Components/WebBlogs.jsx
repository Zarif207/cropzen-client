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
      title: "Step 1: Farmers list their crops",
      desc: "Farmers create an account and add their crops with essential details like price, location, and available quantity.",
    },
    {
      icon: <FaShoppingCart size={32} className="text-green-700" />,
      title: "Step 2: Buyers explore and send interest",
      desc: "Buyers browse available crops and send interest requests by selecting quantity and adding a short message.",
    },
    {
      icon: <FaUserCheck size={32} className="text-green-700" />,
      title: "Step 3: Farmers review buyer requests",
      desc: "Farmers receive all interest requests in one place and can easily accept or reject them.",
    },
    {
      icon: <FaChartLine size={32} className="text-green-700" />,
      title: "Step 4: Crop availability updates",
      desc: "When a request is accepted, the crop quantity updates automatically to keep listings accurate.",
    },
    {
      icon: <FaFolderOpen size={32} className="text-green-700" />,
      title: "Step 5: Manage everything in one dashboard",
      desc: "Both farmers and buyers can track crops, interests, and activity from a single, easy-to-use dashboard.",
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
            A Clear & Simple Journey
            <br /> for Farmers and Buyers
          </h2>

          <p className="text-gray-600 mt-4 text-[15px] leading-relaxed max-w-xl">
            Our platform is designed around a simple flow. Each step is clear,
            transparent, and secure — making it easy to list crops, show
            interest, and manage everything without confusion.
          </p>

          <div className="mt-10 space-y-6 text-gray-700">
            {steps.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                {item.icon}
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button className="mt-10 flex items-center gap-3 bg-green-700 text-white text-lg md:text-xl font-medium px-8 md:px-10 py-4 md:py-5 rounded-full hover:bg-green-600 transition-all mx-auto lg:mx-0">
            Discover More
            <span className="bg-yellow-400 text-green-900 rounded-full p-2 md:p-3 text-lg md:text-xl">
              ➜
            </span>
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