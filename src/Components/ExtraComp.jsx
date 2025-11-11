import React from "react";

const ExtraComp = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 gap-10">
        
        {/* Left Image Section */}
        <div className="shrink-0">
          <img
            src="https://orga.wpengine.com/wp-content/uploads/2018/03/img04.jpg" // 🌿 Replace this with your image link
            alt="Farmer"
            className="w-full max-w-sm lg:max-w-md object-contain"
          />
        </div>

        {/* Right Content Section */}
        <div className="text-center lg:text-left max-w-xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mb-4">
            Looking to do Organic Farming?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Dolor sit amet, consectetuer adipiscing elit diam, sed diam nonummy
            nibh euismod tincidunt ut laoreet dolore volutpat naomi delgado
            conseption guertena delbirkerin suit thelrio samdorano galactico.
          </p>
          <button className="border-2 border-green-600 text-green-600 font-semibold px-8 py-3 rounded-md hover:bg-green-600 hover:text-white transition-all duration-300">
            Post your resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtraComp;