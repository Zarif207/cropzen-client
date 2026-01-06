import React from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const Crops = ({ crops }) => {
  const { _id, name, type, pricePerUnit, image, owner, createdAt } = crops;

  return (
    <div className="flex justify-center py-8">
      <div
        className="
          group w-[340px] sm:w-[360px]
          rounded-3xl overflow-hidden
          bg-white
          border-2 border-gray-100
          shadow-lg hover:shadow-2xl
          transition-all duration-500
          hover:-translate-y-2
          relative
        "
      >
        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 z-10"></div>
          
          <img
            src={image}
            alt={name}
            className="
              w-full h-full object-cover
              transition-transform duration-700
              group-hover:scale-110 group-hover:rotate-2
            "
          />

          {/* TYPE Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-white/95 backdrop-blur-md text-green-700 text-xs font-bold px-4 py-2 rounded-full shadow-lg border-2 border-green-200 transform group-hover:scale-110 transition-all duration-300">
              {type}
            </div>
          </div>

          {/* DATE Badge */}
          <div
            className="
              absolute top-4 right-4 z-20
              bg-gradient-to-br from-green-500 to-emerald-600 text-white
              w-16 h-16 rounded-2xl
              flex flex-col items-center justify-center
              text-xs font-bold
              shadow-xl
              transform group-hover:rotate-6 transition-all duration-300
            "
          >
            <span className="text-2xl font-black">
              {new Date(createdAt).getDate().toString().padStart(2, "0")}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              {new Date(createdAt).toLocaleString("default", {
                month: "short",
              })}
            </span>
          </div>

          {/* Bottom Gradient for Title */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
          
          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 z-20">
            <h3 className="text-white text-2xl font-black drop-shadow-2xl tracking-tight">
              {name}
            </h3>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-4">
          {/* Owner & Price Row */}
          <div className="flex items-center justify-between">
            {/* OWNER */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-lg">👨‍🌾</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Farmer</p>
                <p className="text-sm font-bold text-gray-800">
                  {owner?.ownerName}
                </p>
              </div>
            </div>

            {/* PRICE */}
            <div className="text-right">
              <p className="text-xs text-gray-500 font-medium">Price</p>
              <p className="text-xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ৳{pricePerUnit}
                <span className="text-sm font-semibold text-gray-600">/kg</span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          {/* BUTTON - Bottom Right */}
          <div className="flex justify-end pt-2">
            <Link
              to={`/cropDetails/${_id}`}
              className="
                group/btn
                inline-flex items-center gap-2
                px-5 py-2.5 rounded-xl
                bg-gradient-to-r from-green-500 to-emerald-500
                text-white text-sm
                font-bold
                transition-all duration-300
                hover:from-green-600 hover:to-emerald-600
                hover:gap-3
                shadow-lg shadow-green-500/30
                hover:shadow-xl hover:shadow-green-500/40
                transform hover:scale-105
              "
            >
              <span>Details</span>
              <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crops;