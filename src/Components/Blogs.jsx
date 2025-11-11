/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const BlogsSection = () => {
  return (
    <section className="py-24 bg-[#fdfdfd] relative overflow-hidden mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side Images */}
        <div className="relative lg:w-1/2 w-full">
          {/* Big Image */}
          <motion.img
            src="https://agrikon.ninetheme.com/wp-content/uploads/2020/12/vegetables-800-750x750.jpg"
            alt="Main Agriculture"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl shadow-xl w-full h-[480px] object-cover"
          />

          {/* Small Overlay Image */}
          <motion.img
            src="https://agrikon.ninetheme.com/wp-content/uploads/2020/12/vegetables2-800-750x750.jpg"
            alt="Secondary"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute bottom-[-50px] left-12 w-64 h-40 object-cover rounded-xl border-4 border-white shadow-md hidden sm:block"
          />

          {/* Trusted Badge */}
          <div className="absolute top-6 left-6 bg-[#F6C667] text-white font-semibold text-lg rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-lg">
            <span className="text-sm uppercase tracking-wide">Trusted By</span>
            <span className="text-2xl font-bold">8900 +</span>
          </div>
        </div>

        {/* Right Side Text */}
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-500 tracking-widest uppercase mb-2">
            Welcome to Agricon
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2C4A3E] mb-6 leading-tight">
            Better Agriculture <br /> for Better Future
          </h2>
          <p className="text-[#D69E2E] text-lg mb-6 font-medium">
            We have 30 years of agriculture & eco farming experience globally, work with{" "}
            <span className="underline cursor-pointer hover:text-[#B7791F]">
              professionals
            </span>
          </p>
          <p className="text-gray-600 mb-10 leading-relaxed">
            There are many variations of passages of lorem ipsum available but the majority have suffered alteration
            in some form by injected humor or random word that donor send minimum take minute some lorem ipsum text
            which don't look even.
          </p>

          {/* Icons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2907/2907261.png"
                alt="Professional Farmers"
                className="w-10 h-10"
              />
              <span className="font-semibold text-gray-800">
                Professional Farmers
              </span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/481/481058.png"
                alt="Eco Solutions"
                className="w-10 h-10"
              />
              <span className="font-semibold text-gray-800">
                Organic & Eco Solutions
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogsSection;