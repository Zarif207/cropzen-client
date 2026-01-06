import React from "react";
import { FaLeaf, FaPlusCircle, FaHeart, FaUser } from "react-icons/fa";

const DashboardHome = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* TITLE */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Your Dashboard
        </h1>
        <p className="mt-2 text-gray-600 leading-relaxed">
          This dashboard is your personal workspace inside Cropzen. From here,
          you can manage your crops, track your activity, and connect with the
          agricultural marketplace more efficiently.
        </p>
      </div>

      {/* WHY DASHBOARD */}
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Why this dashboard exists
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Cropzen is built to simplify how farmers and agriculture enthusiasts
          interact with the market. Instead of scattered pages and actions, this
          dashboard brings everything together in one secure place.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Whether you are listing crops, monitoring interest, or managing your
          profile, this dashboard helps you stay organized and focused.
        </p>
      </div>

      {/* WHAT YOU CAN DO */}
      <div className="bg-[#faf9f4] rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
          What you can do here
        </h2>

        <ul className="space-y-4">
          {/* My Profile */}
          <li className="flex items-start gap-3">
            <FaUser className="text-green-600 mt-1" />
            <p className="text-gray-700">
              Manage your personal profile information and account details.
            </p>
          </li>
          {/* Add Crops */}
          <li className="flex items-start gap-3">
            <FaPlusCircle className="text-green-600 mt-1" />
            <p className="text-gray-700">
              Add new crops to the marketplace and make them visible to
              potential buyers.
            </p>
          </li>

          {/* My Posts */}
          <li className="flex items-start gap-3">
            <FaLeaf className="text-green-600 mt-1" />
            <p className="text-gray-700">
              View, update, and manage all the crops you have posted.
            </p>
          </li>

          {/* My Interests */}
          <li className="flex items-start gap-3">
            <FaHeart className="text-green-600 mt-1" />
            <p className="text-gray-700">
              Keep track of crops you are interested in and monitor market
              activity.
            </p>
          </li>
        </ul>
      </div>

      {/* FOOT NOTE */}
      <p className="text-sm text-gray-500 text-center">
        Your dashboard is private and only accessible when you are logged in.
      </p>
    </div>
  );
};

export default DashboardHome;
