/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    subtitle: "NATURAL AGRICULTURE PRODUCTS",
    title: "Pure Agriculture Products",
    button: "Discover More",
    image:
      "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
  },
  {
    id: 2,
    subtitle: "FRESH ORGANIC HARVEST",
    title: "Healthy Food From Nature",
    button: "Shop Fresh",
    image:
      "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
  },
  {
    id: 3,
    subtitle: "SUSTAINABLE LIVING",
    title: "Eco-Friendly Farming Practices",
    button: "Learn More",
    image:
      "https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Centered Text */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
            <p className="text-sm md:text-base tracking-widest mb-4 uppercase text-green-200">
              {slides[current].subtitle}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              {slides[current].title}
            </h1>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition">
              {slides[current].button} <span>→</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight size={18} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? "bg-green-500 scale-110" : "bg-white/50"
            }`}
            onClick={() => setCurrent(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;