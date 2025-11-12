import React from "react";
import { Link } from "react-router";

const Crops = ({ crops }) => {
  const { _id, name, type, pricePerUnit, image, owner, createdAt } = crops;

  return (
    <div className="flex justify-center py-5">
      <div className="bg-white shadow-sm hover:shadow-lg transition-all duration-500 rounded-xl overflow-hidden w-[340px] sm:w-[360px] flex flex-col py-5">
        
        {/* Image Section */}
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-65 object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Type Badge (top-right) */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
            {type}
          </div>

          {/* Date Badge (bottom-right) */}
          <div className="absolute -bottom-6 right-6 bg-green-600 text-white rounded-full w-14 h-14 flex flex-col items-center justify-center text-xs font-semibold shadow-md">
            <span>{new Date(createdAt).getDate().toString().padStart(2, "0")}</span>
            <span>{new Date(createdAt).toLocaleString("default", { month: "short" })}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 pt-10 flex flex-col justify-between flex-grow text-center">
          {/* Owner */}
          <div className="flex items-center justify-center text-gray-500 text-sm mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0A17.933 17.933 0 0112 21.75c-2.745 0-5.34-.623-7.5-1.632z"
              />
            </svg>
            <span className="font-medium">{owner?.ownerName}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>

          {/* Price */}
          <p className="text-green-700 font-bold text-base mb-4">
            ৳{pricePerUnit} /kg
          </p>

          {/* Button */}
          <Link
            to={`/cropDetails/${_id}`}
            className="inline-block bg-green-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Crops;