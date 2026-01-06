/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { FaUser, FaLeaf, FaSeedling } from "react-icons/fa";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 6;


const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://cropzen.vercel.app/crops")
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
        setFilteredCrops(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching crops:", err));
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = crops.filter((crop) =>
      crop.name.toLowerCase().includes(lowerSearch)
    );
    setFilteredCrops(filtered);
    setCurrentPage(1);
  }, [search, crops]);

  const totalPages = Math.ceil(filteredCrops.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCrops = filteredCrops.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          <FaSeedling className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-600 text-2xl animate-pulse" />
        </div>
        <p className="mt-6 text-green-700 font-bold text-xl animate-pulse">
          Loading Fresh Crops...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaLeaf className="absolute top-20 left-10 text-green-200 text-6xl opacity-30 animate-float" />
        <FaSeedling className="absolute top-40 right-20 text-emerald-200 text-5xl opacity-30 animate-float animation-delay-2000" />
        <FaLeaf className="absolute bottom-40 left-1/4 text-teal-200 text-7xl opacity-20 animate-float animation-delay-4000" />
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 py-16 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* HEADER */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-6xl font-black mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">
              Fresh Crops Gallery
            </span>
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg flex items-center justify-center gap-2"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>Discover premium quality crops from local farmers</span>
            <FaLeaf className="text-green-500" />
          </motion.p>
        </div>

        {/* SEARCH */}
        <motion.div
          className="flex justify-center mb-14"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative w-full md:w-2/3 lg:w-1/2">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-30"></div>
            <input
              type="text"
              placeholder="Search for crops by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="relative w-full px-8 py-5 pl-16 rounded-full shadow-2xl 
                         bg-white/90 backdrop-blur-md text-gray-800 placeholder-gray-500 
                         focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300
                         font-medium text-lg border-2 border-white"
            />
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-green-600 text-2xl" />
          </div>
        </motion.div>

        {filteredCrops.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-block p-8 bg-white rounded-3xl shadow-xl">
              <FaSeedling className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-xl">
                No crops found for{" "}
                <span className="font-bold text-green-600">"{search}"</span>
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {paginatedCrops.map((crop, index) => (
              <motion.div
                key={crop._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* 3D Card Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-white transform-gpu perspective-1000">
                  {/* IMAGE with 3D Tilt */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-transparent z-10"></div>
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="h-full w-full object-cover transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                    />

                    {/* Floating Type Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-white/95 backdrop-blur-md text-green-700 font-bold text-sm px-4 py-2 rounded-full shadow-lg border-2 border-green-200 transform group-hover:scale-110 transition-transform duration-300">
                        {crop.type}
                      </div>
                    </div>

                    {/* Bottom Gradient Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>

                    {/* Title on Image */}
                    <div className="absolute bottom-4 left-5 z-20">
                      <h3 className="text-white text-3xl font-black drop-shadow-2xl group-hover:scale-105 transition-transform duration-300">
                        {crop.name}
                      </h3>
                    </div>
                  </div>

                  {/* PRICE TAG - 3D Floating */}
                  <div className="relative -mt-3 mx-5 z-30">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold opacity-90">
                            Price
                          </p>
                          <p className="text-2xl font-black">
                            ৳{crop.pricePerUnit}
                            <span className="text-sm font-medium ml-1">
                              / {crop.unit}
                            </span>
                          </p>
                        </div>
                        {crop.quantity && (
                          <div className="text-right">
                            <p className="text-xs font-semibold opacity-90">
                              Stock
                            </p>
                            <p className="text-xl font-bold">{crop.quantity}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 pt-8 space-y-4">
                    <p className="text-gray-600 text-sm line-clamp-2 min-h-10 leading-relaxed">
                      {crop.description}
                    </p>

                    {/* Meta Info with 3D Icons */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 group/farmer">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center group-hover/farmer:scale-110 transition-transform duration-300">
                          <FaUser className="text-green-600 text-xs" />
                        </div>
                        <span className="font-semibold text-gray-700">
                          {crop.owner?.ownerName || "Unknown"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiMapPin className="text-green-500" />
                        <span className="font-medium">{crop.location}</span>
                      </div>
                    </div>

                    {/* CTA Button with 3D Effect */}
                    <Link
                      to={`/cropDetails/${crop._id}`}
                      className="block relative overflow-hidden group/btn"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative text-center text-white py-4 rounded-2xl font-bold text-base shadow-lg transform group-hover/btn:scale-105 transition-all duration-300">
                        View Details →
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>

      {totalPages > 1 && (
        <div className="flex justify-center mt-16 gap-3 flex-wrap pb-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-5 py-3 rounded-full font-bold transition-all duration-300 ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-green-100 shadow"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCrops;
