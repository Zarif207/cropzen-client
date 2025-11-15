/* eslint-disable no-unused-vars */
import React from "react";
import farmerImg from "../assets/farmer-blog.jpg";
import {
  FaSeedling,
  FaShoppingCart,
  FaUserCheck,
  FaChartLine,
  FaFolderOpen,
} from "react-icons/fa";
import { motion } from "framer-motion";

const WebBlogs = () => {
  return (
    <div className="w-full bg-[#F5F6EF] py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-green-700 uppercase tracking-wider mb-2 font-semibold">
            HOW IT WORKS
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-tight text-[#2c4a3e]">
            Simple Process for
            <br /> Farmers & Buyers
          </h2>

          <p className="text-gray-600 mt-4 text-[15px] leading-relaxed">
            Our crop marketplace connects farmers and buyers through an
            effortless, transparent and secure process. Everything happens in
            one place — from listing crops to managing interests.
          </p>

          <div className="mt-10 space-y-6 text-gray-700">
            {[
              {
                icon: <FaSeedling size={32} className="text-green-700" />,
                title: "Farmers create an account & list crops",
                desc: "Farmers can easily register and showcase their crops with full details like name, price, location, and quantity.",
              },
              {
                icon: <FaShoppingCart size={32} className="text-green-700" />,
                title: "Buyers browse crops & send interest",
                desc: "Buyers explore crops and send interest requests with quantity and a short message.",
              },
              {
                icon: <FaUserCheck size={32} className="text-green-700" />,
                title: "Farmers review interests & respond",
                desc: "Farmers receive and compare requests before accepting or rejecting.",
              },
              {
                icon: <FaChartLine size={32} className="text-green-700" />,
                title: "Quantity updates automatically",
                desc: "Accepted interests instantly update crop availability.",
              },
              {
                icon: <FaFolderOpen size={32} className="text-green-700" />,
                title: "Track everything in dashboard",
                desc: "Both farmers and buyers manage all activities easily.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-4"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                {item.icon}
                <div>
                  <h3 className="font-semibold text-2xl">{item.title}</h3>
                  <p className="text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="mt-10 px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            Learn More →
          </motion.button>
        </motion.div>

        <motion.div
          className="md:-mr-20 lg:-mr-30 xl:-mr-29"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9 }}
        >
          <img
            src={farmerImg}
            alt="Farmer"
            className="w-full h-full object-cover rounded-[150px_0_0_150px]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default WebBlogs;
