import React, { useEffect, useState } from "react";
import aboutimg1 from "../assets/veg-store-1.jpg";
import aboutimg2 from "../assets/veg-store-2.jpg";
import { Link } from "react-router";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

 
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-green-700 font-semibold tracking-wide">
            Loading About Section...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#fdfcf8] py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left image */}
          <div className="flex justify-center">
            <img
              src={aboutimg1}
              alt="Farmer with animal"
              className="w-full max-w-sm rounded-2xl rotate-[-6deg] shadow-lg"
            />
          </div>

          {/* Center text */}
          <div className="text-center px-4">
            <p className="text-sm text-green-700 tracking-wide font-medium mb-2">
              Welcome to Cropzen Agriculture & Organic Farms
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              What You Plant Now,
              <br />
              You Will Harvest Later
            </h2>

            <p className="text-gray-600 mt-6 leading-relaxed">
              Cropzen began with a simple mission — empower farmers and connect
              them directly with buyers through a transparent digital
              marketplace. Today, our platform supports sustainable farming,
              fair pricing, and efficient crop trading across regions.
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed">
              We focus on strengthening rural economies by enabling farmers,
              suppliers, and buyers to collaborate seamlessly while embracing
              modern agricultural practices.
            </p>

            <Link to="/aboutMore" className="mt-8 inline-flex items-center gap-3 bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition">
              More About Us
              <span className="bg-yellow-400 text-green-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                →
              </span>
            </Link>
          </div>

          {/* Right image */}
          <div className="flex justify-center">
            <img
              src={aboutimg2}
              alt="Farmer harvesting crops"
              className="w-full max-w-sm rounded-2xl rotate-[6deg] shadow-lg"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-4xl font-bold text-green-700">1,360</h3>
            <p className="mt-2 text-gray-700 font-medium">Completed Projects</p>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-3 rounded-full" />
          </div>

          <div>
            <h3 className="text-4xl font-bold text-green-700">1,036</h3>
            <p className="mt-2 text-gray-700 font-medium">Animals & Plants</p>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-3 rounded-full" />
          </div>

          <div>
            <h3 className="text-4xl font-bold text-green-700">4,657</h3>
            <p className="mt-2 text-gray-700 font-medium">Tons of Harvest</p>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-3 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;