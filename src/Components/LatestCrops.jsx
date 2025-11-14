import React, { useEffect, useState } from "react";
import Crops from "./Crops";
import { Link } from "react-router";

const LatestCrops = ({ latestCropsPromise }) => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    latestCropsPromise.then((data) => setCrops(data));
  }, [latestCropsPromise]);

  return (
    <div className="mb-12">
      <h2 className="text-4xl lg:text-5xl font-bold text-[#2C4A3E] text-center p-5 mt-50 mb-6 leading-tight">
        Our Latest Crops
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-30">
        {crops.map((crops) => (
          <Crops key={crops._id} crops={crops} />
        ))}
      </div>

      {/* Center Button */}
      <div className="flex justify-center mt-10">
        <Link
          to="/allCrops"
          className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition"
        >
           All Crops
        </Link>
      </div>
    </div>
  );
};

export default LatestCrops;