import React from "react";
import Banner from "../Components/Banner";
import Procedure from "../Components/Procedure";
import Blogs from "../Components/Blogs";
import LatestCrops from "../Components/LatestCrops";
import Specialists from "../Components/Specialists";
import ExtraComp from "../Components/ExtraComp";
import ExtraComp2 from "../Components/ExtraComp2";

const Home = () => {
  const latestCropsPromise = fetch(
    "https://cropzen.vercel.app/latest-crops"
  ).then((res) => res.json());
  return (
    <div>
      <Banner />
      <LatestCrops latestCropsPromise={latestCropsPromise}></LatestCrops>
      <Blogs />
      <Procedure />
      <ExtraComp2 />
      <Specialists />
      <ExtraComp />
    </div>
  );
};

export default Home;
