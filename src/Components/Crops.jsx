import React from "react";
import { Link } from "react-router";

const Crops = ({ crops }) => {
  const {_id, name, type, pricePerUnit, image, owner, createdAt } = crops;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Type Badge (top-right) */}
        <div className="absolute top-4 right-4 bg-white text-green-600 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {type}
        </div>

        {/* Date Badge (bottom-right) */}
        <div className="absolute -bottom-5 right-6 bg-green-600 text-white rounded-full px-4 py-3 text-center shadow-md w-16 h-16 flex flex-col items-center justify-center text-sm font-semibold">
          <span>{new Date(createdAt).getDate().toString().padStart(2, "0")}</span>
          <span>{new Date(createdAt).toLocaleString("default", { month: "short" })}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 mt-6">
        {/* Owner */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
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
          <span>{owner?.ownerName}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {name}
        </h3>

        {/* Price */}
        <p className="text-green-700 font-bold text-lg mb-4">
          ৳{pricePerUnit} /kg
        </p>

        {/* Button */}
        <Link to={`/cropDetails/${_id}`} className="bg-amber-400 text-white font-medium px-5 py-2 rounded-md hover:bg-[#4aa760] transition-colors duration-300">
          Crops Details
        </Link>
      </div>
    </div>
  );
};

export default Crops;