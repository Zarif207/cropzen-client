import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookMessenger,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import vegStore1 from "../assets/veg-store-1.jpg";
import vegStore2 from "../assets/veg-store-2.jpg";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#244d36] text-gray-200 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 border-b border-green-700 pb-10">
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold italic text-white mb-4">Cropzen</h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Your trusted platform for reliable crop trading and farming support.
            Together, we're building a future of sustainability and smarter
            agriculture.
          </p>

          {/* NEWSLETTER */}
          <form className="flex items-center mb-6 bg-white rounded-md overflow-hidden w-64">
            <input
              type="email"
              required
              placeholder="Email Address"
              className="flex-1 px-3 py-2 text-gray-800 outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 px-4 py-2 text-white font-semibold"
            >
              →
            </button>
          </form>

          {/* SOCIAL */}
          <div className="flex space-x-4 text-gray-200 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="hover:text-white" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaXTwitter className="hover:text-white" />
            </a>
            <a href="https://m.me/" target="_blank" rel="noreferrer">
              <FaFacebookMessenger className="hover:text-white" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-white" />
            </a>
          </div>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/allCrops" className="hover:text-white">
                All Crops
              </Link>
            </li>

            <li>
              <Link to="/aboutUs" className="hover:text-white">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/marketplace" className="hover:text-white">
                Market News
              </Link>
            </li>

            <li>
              <Link to="/events" className="hover:text-white">
                Upcoming Events
              </Link>
            </li>

            <li>
              <Link to="/premiumFarmers" className="hover:text-white">
                Premium Farmers
              </Link>
            </li>
          </ul>
        </div>

        {/* NEWS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">News</h3>
          <div className="space-y-5">
            <a href="#" className="flex items-center space-x-3">
              <img
                src={vegStore1}
                alt="news"
                className="w-14 h-14 rounded-md object-cover"
              />
              <div>
                <p className="text-sm text-yellow-400 font-semibold">
                  Dec 31, 2019
                </p>
                <p className="text-gray-300 text-sm hover:text-white">
                  Keep the Green Out of the Potato
                </p>
              </div>
            </a>

            <a href="#" className="flex items-center space-x-3">
              <img
                src={vegStore2}
                alt="news"
                className="w-14 h-14 rounded-md object-cover"
              />
              <div>
                <p className="text-sm text-yellow-400 font-semibold">
                  Feb 8, 2020
                </p>
                <p className="text-gray-300 text-sm hover:text-white">
                  Friendly Breakfast Ideas
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-center space-x-3">
              <FaWhatsapp className="text-green-400 text-lg" />
              <a
                href="https://wa.me/15553420032"
                target="_blank"
                rel="noreferrer"
              >
                555 342 0032
              </a>
            </li>

            <li className="flex items-center space-x-3">
              <FaPhoneAlt className="text-green-400 text-lg" />
              <a href="tel:+16668880000">666 888 0000</a>
            </li>

            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-green-400 text-lg" />
              <a href="mailto:needhelp@cropzen.com">needhelp@cropzen.com</a>
            </li>

            <li className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-green-400 text-lg" />
              <a
                href="https://maps.google.com?q=80+brooklyn+golden+street+line+new+york"
                target="_blank"
                rel="noreferrer"
              >
                80 broklyn golden street line, New York, USA
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm pt-6">
        <p>© Copyright by Ninetheme.com</p>

        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
