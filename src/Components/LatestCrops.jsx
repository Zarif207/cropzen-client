/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Crops from "./Crops";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";

const LatestCrops = ({ latestCropsPromise }) => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // This will run every time the component is rendered
    const fetchLatestCrops = async () => {
      setLoading(true);
      try {
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime();
        const response = await fetch(`https://cropzen.vercel.app/crops?t=${timestamp}`, {
          cache: "no-cache",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        
        const data = await response.json();
        
        // Sort by newest first - check multiple date fields
        const sortedCrops = data
          .sort((a, b) => {
            const getDate = (item) => {
              return new Date(
                item.createdAt || 
                item.addedDate || 
                item.created_at || 
                item.date || 
                item._id
              ).getTime();
            };
            return getDate(b) - getDate(a);
          })
          .slice(0, 6);
        
        setCrops(sortedCrops);
      } catch (error) {
        console.error("Error fetching crops:", error);
        
        // Fallback to promise prop if available
        if (latestCropsPromise) {
          try {
            const data = await latestCropsPromise;
            setCrops(data.slice(0, 6));
          } catch (err) {
            console.error("Error with promise:", err);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCrops();
    
    // Also refetch when location changes (user navigates back)
  }, [location.pathname, latestCropsPromise]);

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
        {loading ? (
          // Show previous crops while loading to prevent flash
          crops.length > 0 ? (
            crops.map((crop) => (
              <motion.div
                key={crop._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Crops crops={crop} />
              </motion.div>
            ))
          ) : (
            // Loading skeleton only if no crops yet
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg"></div>
              </div>
            ))
          )
        ) : (
          crops.map((crop) => (
            <motion.div
              key={crop._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Crops crops={crop} />
            </motion.div>
          ))
        )}
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