import React from "react";

const ExtraComp = () => {
  return (
    <div className="bg-white mt-15">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 gap-10">
        <div className="shrink-0">
          <img
            src="https://orga.wpengine.com/wp-content/uploads/2018/03/img04.jpg"
            alt="Farmer"
            className="w-full max-w-sm lg:max-w-md object-contain"
          />
        </div>

        <div className="text-center lg:text-left max-w-xl">
          <h2 className="text-5xl font-extrabold text-[#2c4a3e] leading-tight">
            Looking to do Organic Farming?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 text-lg pt-10">
            Organic farming opens the door to cleaner harvests, eco-friendly
            practices, and long-term sustainability. Start your journey toward
            healthier soil, safer produce, and a better tomorrow.
          </p>
          <button className="border-2 border-green-600 text-green-600 font-semibold px-8 py-3 rounded-md hover:bg-green-600 hover:text-white transition-all duration-300 mb-7">
            Post your resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtraComp;
