import React from "react";

import img1 from "../assets/crops-1.svg";
import img2 from "../assets/icon-img-2.webp";
import img3 from "../assets/icon-img-3.webp";
import img4 from "../assets/icon-img-4.webp";
import img5 from "../assets/icon-img-5.webp";
import img6 from "../assets/icon-img-6.webp";
import img7 from "../assets/icon-img-7.webp";

const items = [
  { image: img1, name: "Awesome Broccoli" },
  { image: img2, name: "Orange Pumpkin" },
  { image: img3, name: "Juicy Tomato" },
  { image: img4, name: "Crispy Cabbage" },
  { image: img5, name: "Bomb Corn" },
  { image: img6, name: "The Best Potato" },
  { image: img7, name: "Blue Eggplant" },
];

const ExtraComponent1 = () => {
  return (
    <section className="bg-[#e6e6e6] py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* Label */}
        <p className="text-green-700 uppercase tracking-wider mb-2 font-semibold text-center">
          PRODUCTS GLOBALLY
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#2C4A3E] mb-6 text-center">
          The World’s Best For Agriculture
      
        </h2>

        {/* Grid */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-16">
          {items.map((item, index) => (
            <div
              key={index}
              className="
                group
                flex flex-col items-center gap-4
                transition-transform duration-300
                hover:-translate-y-2
              "
            >
              {/* Image circle */}
              <div
                className="
                  w-24 h-24 rounded-full
                  bg-[#f3f1e8]
                  flex items-center justify-center
                  shadow-sm
                  transition-all duration-300
                  group-hover:shadow-lg
                  group-hover:bg-white
                "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-14 h-14 object-contain
                    transition-transform duration-300
                    group-hover:scale-110
                    group-hover:rotate-3
                  "
                />
              </div>

              {/* Name */}
              <p
                className="
                  font-medium text-gray-900
                  transition-colors duration-300
                  group-hover:text-[#c9a45c]
                "
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExtraComponent1;