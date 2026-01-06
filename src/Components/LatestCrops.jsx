/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Crops from "./Crops";
import { Link } from "react-router";
import { motion } from "framer-motion";

const LatestCrops = ({ latestCropsPromise }) => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    latestCropsPromise.then((data) => setCrops(data));
  }, [latestCropsPromise]);

  return (
    <div className="mb-12 px-4 md:px-10 lg:px-20">
      {/* TITLE */}
      <motion.h2
        className="
          text-4xl md:text-5xl font-bold 
          text-base-content 
          mb-6 text-center mt-20
        "
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Our Latest Crops
      </motion.h2>

      {/* SUBTITLE */}
      <p className="text-green-600 uppercase tracking-wider mb-2 font-semibold text-center">
        Explore the freshest harvests added by our trusted farmers.
      </p>

      {/* CROPS GRID */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {crops.map((crop) => (
          <motion.div
            key={crop._id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Crops crops={crop} />
          </motion.div>
        ))}
      </motion.div>

      {/* BUTTON */}
      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/allCrops"
          className="
      inline-flex items-center gap-3
      bg-green-700 text-white
      px-6 py-3
      rounded-full
      hover:bg-green-800 transition
    "
        >
          All Crops
          <span
            className="
        bg-yellow-400 text-green-900
        w-8 h-8
        rounded-full
        flex items-center justify-center
        font-bold
      "
          >
            →
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

export default LatestCrops;
