import React from "react";
import farmerImg from "../assets/farmer-blog.jpg";

// React Icons
import { FaSeedling, FaShoppingCart, FaUserCheck, FaChartLine, FaFolderOpen } from "react-icons/fa";

const WebBlogs = () => {
  return (
    <div className="w-full bg-[#F5F6EF] py-16 px-6 md:px-20 font-[Poppins]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT SIDE CONTENT */}
        <div>
          <p className="text-green-700 font-semibold tracking-wide flex items-center gap-2 text-xl">
            HOW IT WORKS
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
            Simple Process for  
            <br /> Farmers & Buyers
          </h2>

          <p className="text-gray-600 mt-4 text-[15px] leading-relaxed">
            Our crop marketplace connects farmers and buyers through an effortless,
            transparent and secure process. Everything happens in one place — from 
            listing crops to managing interests.
          </p>

          {/* HOW IT WORKS POINTS */}
          <div className="mt-10 space-y-6 text-gray-700">

            <div className="flex gap-4">
              <FaSeedling size={32} className="text-green-700" />
              <div>
                <h3 className="font-semibold text-lg">
                  Farmers create an account & list crops
                </h3>
                <p className="text-sm">
                  Add crop name, category, location, price, and available quantity.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FaShoppingCart size={32} className="text-green-700" />
              <div>
                <h3 className="font-semibold text-lg">
                  Buyers browse crops & send interest
                </h3>
                <p className="text-sm">
                  Each interest includes a message and requested quantity.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FaUserCheck size={32} className="text-green-700" />
              <div>
                <h3 className="font-semibold text-lg">
                  Farmers review interests & respond
                </h3>
                <p className="text-sm">
                  Accept or reject requests from the crop’s detail page.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FaChartLine size={32} className="text-green-700" />
              <div>
                <h3 className="font-semibold text-lg">
                  Quantity updates automatically
                </h3>
                <p className="text-sm">
                  Accepted requests instantly reduce crop availability.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FaFolderOpen size={32} className="text-green-700" />
              <div>
                <h3 className="font-semibold text-lg">
                  Track everything in dashboard
                </h3>
                <p className="text-sm">
                  Farmers use “My Posts”, buyers use “My Interests”.
                </p>
              </div>
            </div>

          </div>

          <button className="mt-10 px-8 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition font-semibold">
            Learn More →
          </button>
        </div>

        {/* RIGHT SIDE IMAGE */}
        {/* RIGHT SIDE IMAGE */}
<div className="md:-mr-20 lg:-mr-32 xl:-mr-40">
  <img
    src={farmerImg}
    alt="Farmer"
    className="w-full h-full object-cover rounded-[150px_0_0_150px]"
  />
</div>
      </div>
    </div>
  );
};

export default WebBlogs;