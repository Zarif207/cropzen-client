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
    <h2 className="text-5xl text-center my-10">Latest Crops</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-10">
        {crops.map((crops) => (
          <Crops key={crops._id} crops={crops}></Crops>
        ))}
      </div>
    </div>
  );
};

export default LatestCrops;
