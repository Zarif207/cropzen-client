import React, { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import {
  FaHome,
  FaUser,
  FaLeaf,
  FaHeart,
  FaPlusCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../assets/web-logo-2.png";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium
     ${
       isActive
         ? "bg-green-600 text-white shadow-md"
         : "text-green-100 hover:bg-green-600/80"
     }`;

  return (
    <div className="min-h-screen flex bg-[#f6f8f4]">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="w-72 bg-gradient-to-b from-green-700 to-green-800 text-white hidden lg:flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-6 border-b font-extrabold italic border-green-600">
          <img src={logo} alt="Cropzen" className="w-10 h-10" />
          <h2 className="text-2xl font-bold tracking-wide">Cropzen</h2>
        </div>

        {/* User */}
        <div className="px-6 py-5 border-b border-green-600 flex items-center gap-3">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/50"}
            alt="profile"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div>
            <p className="font-semibold text-sm">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-green-200">Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink to="/dashboard/profile" className={linkClass}>
            <FaUser /> Profile
          </NavLink>
          <NavLink to="/dashboard/add-crops" className={linkClass}>
            <FaPlusCircle /> Add Crops
          </NavLink>
          <NavLink to="/dashboard/my-posts" className={linkClass}>
            <FaLeaf /> My Posts
          </NavLink>
          <NavLink to="/dashboard/my-interests" className={linkClass}>
            <FaHeart /> My Interests
          </NavLink>
        </nav>

        {/* Back Home */}
        <div className="px-6 pb-6">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-yellow-400 text-green-900 font-semibold hover:bg-yellow-300 transition"
          >
            <FaHome />
            Back Home
          </button>
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Sidebar */}
          <aside className="absolute left-0 top-0 w-72 h-full bg-gradient-to-b from-green-700 to-green-800 text-white flex flex-col shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-green-600">
              <div className="flex items-center gap-2 font-extrabold italic">
                <img src={logo} className="w-9 h-9" alt="logo" />
                <span className="text-xl">Cropzen</span>
              </div>
              <button onClick={() => setMenuOpen(false)}>
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* User */}
            <div className="px-6 py-5 border-b border-green-600 flex items-center gap-3">
              <img
                src={user?.photoURL || "https://i.pravatar.cc/50"}
                className="w-12 h-12 rounded-full border-2 border-white"
                alt="profile"
              />
              <div>
                <p className="font-semibold text-sm">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-green-200">Dashboard</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <NavLink
                to="/dashboard/profile"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                <FaUser /> Profile
              </NavLink>

              <NavLink
                to="/dashboard/add-crops"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                <FaPlusCircle /> Add Crops
              </NavLink>

              <NavLink
                to="/dashboard/my-posts"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                <FaLeaf /> My Posts
              </NavLink>

              <NavLink
                to="/dashboard/my-interests"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                <FaHeart /> My Interests
              </NavLink>
            </nav>

            {/* Back Home */}
            <div className="px-6 pb-6">
              <button
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-yellow-400 text-green-900 font-semibold"
              >
                <FaHome /> Back Home
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        {/* MOBILE TOP BAR */}
        <div className="lg:hidden bg-green-700 text-white px-4 py-4 flex items-center justify-between shadow">
          <button onClick={() => setMenuOpen(true)}>
            <FaBars className="text-2xl" />
          </button>

          <span className="font-bold italic">Dashboard</span>

          <button
            onClick={() => navigate("/")}
            className="bg-yellow-400 text-green-900 px-3 py-1.5 rounded-lg text-sm font-semibold"
          >
            Home
          </button>
        </div>

        <main className="p-6 md:p-10 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;