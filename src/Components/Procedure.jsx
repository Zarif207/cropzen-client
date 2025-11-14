/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaTractor, FaLeaf, FaCarrot, FaTint } from "react-icons/fa";

const steps = [
  {
    id: 1,
    image:
      "https://agrikon.ninetheme.com/wp-content/uploads/2020/12/service-6.jpg",
    icon: <FaTractor className="text-white text-3xl" />,
    title: "Agriculture Products",
    desc: "Lorem ipsum dolor sit ametad pisicing elit sed simply do ut.",
  },
  {
    id: 2,
    image:
      "https://agrikon.ninetheme.com/wp-content/uploads/2020/12/service-7.jpg",
    icon: <FaLeaf className="text-white text-3xl" />,
    title: "Organic Products",
    desc: "Lorem ipsum dolor sit ametad pisicing elit sed simply do ut.",
  },
  {
    id: 3,
    image:
      "https://agrikon.ninetheme.com/wp-content/uploads/2020/12/service-5.jpg",
    icon: <FaCarrot className="text-white text-3xl" />,
    title: "Fresh Vegetables",
    desc: "Lorem ipsum dolor sit ametad pisicing elit sed simply do ut.",
  },
  {
    id: 4,
    image:
      "https://agrikon.ninetheme.com/wp-content/uploads/2020/12/service-4.jpg",
    icon: <FaTint className="text-white text-3xl" />,
    title: "Dairy Products",
    desc: "Lorem ipsum dolor sit ametad pisicing elit sed simply do ut.",
  },
];

const Procedure = () => {
  return (
    <section className="relative py-24 bg-[#fffef4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-green-700 uppercase tracking-wider mb-2 font-semibold"
        >
          Welcome to Agricon Procedure
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#2C4A3E] mb-16"
        >
          What We’re Offering
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden relative group"
            >
              {/* Image */}
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Floating Icon */}
              <div className="absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 border-white">
                {step.icon}
              </div>

              {/* Text */}
              <div className="pt-12 pb-10 px-6 text-center">
                <h3 className="text-lg font-bold text-[#2C4A3E] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle top & bottom fade */}
      <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Procedure;