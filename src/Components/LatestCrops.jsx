import React, { useEffect, useState } from "react";
import Crops from "./Crops";

const LatestCrops = ({ latestCropsPromise }) => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    latestCropsPromise.then((data) => setCrops(data));
  }, [latestCropsPromise]);

  console.log(crops);

  return (
    <div>
    <h2 className="text-4xl lg:text-5xl font-bold text-[#2C4A3E] text-center p-5 mt-50 mb-6 leading-tight">Our Latest Crops</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-30">
        {crops.map((crops) => (
          <Crops key={crops._id} crops={crops}></Crops>
        ))}
      </div>
    </div>
  );
};

export default LatestCrops;
