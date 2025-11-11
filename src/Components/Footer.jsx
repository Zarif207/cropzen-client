import React from "react";
import { FaFacebookF, FaTwitter, FaPinterestP, FaInstagram, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#244d36] text-gray-200 pt-16 pb-8 relative overflow-hidden">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 border-b border-green-700 pb-10">
        
        {/* Logo + About */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/619/619034.png"
              alt="logo"
              className="w-10 h-10"
            />
            <h2 className="text-2xl font-bold text-white">Agrikon</h2>
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">
            There are many variations of passages of lorem ipsum available,
            but the majority suffered.
          </p>
          <div className="flex items-center mb-6 bg-white rounded-md overflow-hidden w-64">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-3 py-2 text-gray-800 outline-none"
            />
            <button className="bg-green-600 px-4 py-2 text-white font-semibold">
              →
            </button>
          </div>
          <div className="flex space-x-4 text-gray-200 text-xl">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaPinterestP className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">Our Projects</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Our Services</li>
            <li className="hover:text-white cursor-pointer">Upcoming Events</li>
            <li className="hover:text-white cursor-pointer">Volunteers</li>
          </ul>
        </div>

        {/* News */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">News</h3>
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=60"
                alt="news"
                className="w-14 h-14 rounded-md object-cover"
              />
              <div>
                <p className="text-sm text-yellow-400 font-semibold">
                  Dec 31, 2019
                </p>
                <p className="text-gray-300 text-sm hover:text-white cursor-pointer">
                  Keep the Green Out of the Potato
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1600093463592-8e36ae74a6c7?auto=format&fit=crop&w=200&q=60"
                alt="news"
                className="w-14 h-14 rounded-md object-cover"
              />
              <div>
                <p className="text-sm text-yellow-400 font-semibold">
                  Feb 8, 2020
                </p>
                <p className="text-gray-300 text-sm hover:text-white cursor-pointer">
                  Friendly Breakfast Ideas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-center space-x-3">
              <FaWhatsapp className="text-green-400 text-lg" />
              <span>555 342 0032</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhoneAlt className="text-green-400 text-lg" />
              <span>666 888 0000</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-green-400 text-lg" />
              <span>needhelp@company.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-green-400 text-lg" />
              <span>80 broklyn golden street line, New York, USA</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm pt-6">
        <p>© Copyright by Ninetheme.com</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <p className="hover:text-white cursor-pointer">Terms & Conditions</p>
          <p className="hover:text-white cursor-pointer">Privacy Policy</p>
          <p className="hover:text-white cursor-pointer">Sitemap</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;