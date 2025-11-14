import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch crops
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
  }, [search, crops]);

  // ✅ Custom Loading Spinner
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-green-700 font-semibold text-lg animate-pulse">
          Loading crops...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search for crops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 pl-12 rounded-full shadow-md 
                       bg-white/70 backdrop-blur-md text-gray-700 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 text-xl" />
        </div>
      </div>

      {/* 🌱 Crop Cards */}
      {filteredCrops.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-16">
          No crops found for{" "}
          <span className="font-semibold text-green-600">"{search}"</span>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCrops.map((crop) => (
            <div
              key={crop._id}
              className="group relative bg-white rounded-2xl overflow-hidden 
                         shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* 🖼️ Image Banner */}
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-white text-2xl font-semibold drop-shadow-md flex items-center gap-2">
                    {crop.name}
                  </h3>
                </div>
                <span className="absolute top-3 right-3 bg-white/90 text-green-700 font-semibold text-sm px-3 py-1 rounded-full shadow-sm">
                  {crop.type}
                </span>
              </div>

              {/* 💰 Quick Info Bar */}
              <div className="flex items-center justify-between bg-green-50 py-3 px-5 border-b border-green-100">
                <p className="flex items-center gap-1 text-green-700 font-semibold">
                  ৳ {crop.pricePerUnit} / {crop.unit}
                </p>
                {crop.quantity && (
                  <p className="flex items-center gap-1 text-gray-700 font-medium">
                    {crop.quantity} available
                  </p>
                )}
              </div>

              {/* 📋 Crop Description */}
              <div className="p-5 space-y-3">
                <p className="text-gray-600 text-sm line-clamp-2 min-h-[40px]">
                  {crop.description}
                </p>

                {/* 👤 Owner and 📍 Location */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-green-600" />
                    {crop.owner?.ownerName || "Unknown Farmer"}
                  </div>
                  <p className="flex items-center gap-1">
                    <FiMapPin className="text-green-500" /> {crop.location}
                  </p>
                </div>

                {/* 🔗 Details Button */}
                <div className="pt-3">
                  <Link
                    to={`/cropDetails/${crop._id}`}
                    className="block w-full text-center bg-gradient-to-r from-green-600 to-green-500 
                               text-white py-2.5 rounded-xl font-medium shadow-sm 
                               hover:from-green-700 hover:to-green-600 transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCrops;
