import React from "react";
import Banner from "../Components/Banner";
import Procedure from "../Components/Procedure";
import Blogs from "../Components/Blogs";
import LatestCrops from "../Components/LatestCrops";
import Specialists from "../Components/Specialists";
import ExtraComp from "../Components/ExtraComp";
import ExtraComp2 from "../Components/ExtraComp2";
import WebBlogs from "../Components/WebBlogs";
import ExtraComponent1 from "../Components/ExtraComponent1";
import Opinion from "../Components/Opinion";
import Faq from "../Components/Faq";

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
      <WebBlogs/>
      <ExtraComponent1/>
      <Opinion/>
      <Faq/>
      <ExtraComp />
    </div>
  );
};

export default Home;
