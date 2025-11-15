/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const ExtraComp2 = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-6 py-16 md:py-20 flex flex-col lg:flex-row items-center gap-14 md:gap-20 mb-5">

    
      <motion.div
        className="flex-1 space-y-5 md:space-y-6 text-center lg:text-left order-2 lg:order-1"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-green-700 italic font-medium text-lg md:text-xl">
          Get to Know Us
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2c4a3e] leading-snug md:leading-tight">
          We’re leading Organic & <br /> Agriculture Market
        </h2>

        <p className="text-gray-500 leading-relaxed text-base md:text-lg max-w-xl mx-auto lg:mx-0">
          Agriculture is the practice of cultivating soil, growing crops, and
          raising animals for food, fiber, medicinal plants, and other products
          used to sustain & enhance human life.
        </p>

        
        <div className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-12 mt-8 justify-center lg:justify-start">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-yellow-100 p-3 md:p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-7 md:w-7 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 20l9-5-9-5-9 5 9 5zm0-10V4m0 0l-3.5 3.5M12 4l3.5 3.5"
                />
              </svg>
            </div>
            <p className="font-semibold text-lg md:text-xl text-[#1a2e05] leading-snug">
              Protect what <br /> you saw
            </p>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-yellow-100 p-3 md:p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-7 md:w-7 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c1.38 0 2.5 1.12 2.5 2.5S13.38 13 12 13s-2.5-1.12-2.5-2.5S10.62 8 12 8z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14v7m0-7l-4 4m4-4l4 4"
                />
              </svg>
            </div>
            <p className="font-semibold text-lg md:text-xl text-[#1a2e05] leading-snug">
              The Green is <br /> our future
            </p>
          </div>
        </div>

        <button className="mt-10 flex items-center gap-3 bg-green-700 text-white text-lg md:text-xl font-medium px-8 md:px-10 py-4 md:py-5 rounded-full hover:bg-green-600 transition-all mx-auto lg:mx-0">
          Discover More
          <span className="bg-yellow-400 text-green-900 rounded-full p-2 md:p-3 text-lg md:text-xl">
            ➜
          </span>
        </button>
      </motion.div>

     
      <motion.div
        className="flex-1 relative flex justify-center lg:justify-end order-1 lg:order-2"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
       
        <div className="absolute -top-4 md:-top-10 -right-3 md:-right-8 
          w-[200px] sm:w-[250px] md:w-[360px] lg:w-[420px]
          h-[270px] sm:h-80 md:h-[420px] lg:h-[480px]
          bg-green-900 rounded-lg -z-10">
        </div>

      
        <img
          src="https://argonic-agriculture-and-organic-farm-html-template.vercel.app/assets/images/about/about-thumb.png"
          alt="Organic Farming"
          className="w-[200px] sm:w-[250px] md:w-[380px] lg:w-[450px] h-auto rounded-lg object-cover"
        />

    
        <div className="absolute bottom-3 left-3 bg-green-800 text-white 
          text-sm sm:text-base md:text-lg font-semibold
          px-4 sm:px-5 md:px-7 py-1.5 sm:py-2 md:py-3 rounded-full shadow-lg">
          30+ <span className="font-normal">Years Experience</span>
        </div>
      </motion.div>
    </section>
  );
};

export default ExtraComp2;