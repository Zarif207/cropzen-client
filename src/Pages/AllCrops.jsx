import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiSearch } from "react-icons/fi"; // ✅ Feather Search icon
import { AiOutlineDollar } from "react-icons/ai";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch crops
  useEffect(() => {
    fetch("http://localhost:3000/crops")
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
        setFilteredCrops(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching crops:", err));
  }, []);

  // ✅ Search filter
  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = crops.filter((crop) =>
      crop.name.toLowerCase().includes(lowerSearch)
    );
    setFilteredCrops(filtered);
  }, [search, crops]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-green-700 font-semibold text-xl">
        Loading crops...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* 🌿 Search Bar */}
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

      {/* 🌱 Crop Cards Grid */}
      {filteredCrops.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-16">
          ❌ No results found for "
          <span className="font-semibold">{search}</span>"
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCrops.map((crop) => (
            <div
              key={crop._id}
              className="bg-white rounded-2xl shadow-lg border border-green-100 
                         overflow-hidden hover:shadow-2xl transition-transform duration-300 
                         hover:-translate-y-1"
            >
              <img
                src={crop.image}
                alt={crop.name}
                className="h-52 w-full object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-green-700">
                  {crop.name}
                </h3>
                <p className="text-gray-500 text-sm">{crop.type}</p>
                <p className="text-gray-700">
                  <span className="font-semibold">
                    {crop.pricePerUnit}
                  </span> / {crop.unit}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {crop.description}
                </p>
                <p className="text-sm text-gray-500">📍 {crop.location}</p>

                <div className="pt-3">
                  <Link
                    to={`/cropDetails/${crop._id}`}
                    className="inline-block w-full text-center bg-gradient-to-r from-green-600 to-green-500 
                               text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-green-600 
                               transition-all duration-300 shadow-sm"
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
