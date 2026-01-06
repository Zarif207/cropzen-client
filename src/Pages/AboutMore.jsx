import React from "react";
import { FaLeaf, FaSeedling, FaHandsHelping } from "react-icons/fa";
import aboutimg1 from "../assets/about-1.webp";
import aboutimg2 from "../assets/about-2.webp";
import aboutimg3 from "../assets/about-4.webp";

const AboutMore = () => {
  return (
    <div className="bg-[#f9faf7]">
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* TEXT */}
        <div>
          <p className="text-sm tracking-widest text-green-600 font-semibold mb-4">
            OUR PROJECTS
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            We’re Providing <br />
            <span className="text-green-700">High Quality Products</span>
          </h1>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Cropzen is built to empower farmers, connect communities, and ensure
            access to fresh, reliable, and sustainable agricultural products.
            We believe quality food starts at the roots — with farmers who are
            supported, informed, and fairly connected to markets.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <FaSeedling className="text-green-600 text-xl mt-1" />
              <p className="text-gray-700">
                Supporting local farmers with modern digital tools and fair
                pricing systems.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FaLeaf className="text-green-600 text-xl mt-1" />
              <p className="text-gray-700">
                Promoting sustainable farming and eco-friendly practices.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FaHandsHelping className="text-green-600 text-xl mt-1" />
              <p className="text-gray-700">
                Building trust between producers and consumers through
                transparency.
              </p>
            </div>
          </div>
        </div>

        {/* IMAGES GRID */}
        <div className="grid grid-cols-2 gap-6">
          <img
            src={aboutimg1}
            alt="Farmer holding basket"
            className="rounded-3xl object-cover h-64 w-full shadow-lg"
          />
          <img
            src={aboutimg2}
            alt="Fresh vegetables"
            className="rounded-3xl object-cover h-64 w-full shadow-lg"
          />
          <img
            src={aboutimg3}
            alt="Greenhouse farming"
            className="rounded-3xl object-cover h-64 w-full shadow-lg col-span-2"
          />
        </div>
      </section>

      {/* ================= INFO SECTION ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div className="p-8 rounded-2xl bg-[#f5f7f3] hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To create a transparent agricultural marketplace where farmers
              earn fair value and consumers receive fresh, trustworthy produce.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#f5f7f3] hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              A future where technology bridges rural farms and urban markets,
              ensuring food security and sustainable growth.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#f5f7f3] hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Our Impact
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Helping farmers increase income, reduce waste, and reach buyers
              faster through smart digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Growing Together With Farmers
          </h2>
          <p className="mt-4 text-gray-600">
            Cropzen is more than a platform — it’s a community focused on trust,
            sustainability, and growth.
          </p>

          <button className="mt-8 inline-flex items-center gap-3 bg-green-700 text-white px-8 py-4 rounded-full hover:bg-green-800 transition">
            Join Our Journey
            <span className="bg-yellow-400 text-green-900 w-9 h-9 rounded-full flex items-center justify-center font-bold">
              →
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutMore;