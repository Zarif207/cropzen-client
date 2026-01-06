import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import logo from "../assets/web-logo-2.png";
import { GiFarmer } from "react-icons/gi";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  // 🚪 LOGOUT WITH CONFIRMATION
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from Cropzen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire({
              title: "Logged out!",
              text: "You have been logged out successfully.",
              icon: "success",
              confirmButtonColor: "#16a34a",
            });
          })
          .catch(() => {
            Swal.fire("Error", "Logout failed!", "error");
          });
      }
    });
  };

  const linkClass = ({ isActive }) =>
    `relative font-medium transition duration-200 ${
      isActive
        ? "text-green-700 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-green-600"
        : "text-base-content hover:text-green-600"
    }`;

  const premiumLinkClass = ({ isActive }) =>
    `relative flex items-center gap-2 font-semibold transition duration-300 ${
      isActive
        ? "text-yellow-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-yellow-500"
        : "text-yellow-600 hover:text-yellow-700 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-500 hover:after:w-full after:transition-all after:duration-300"
    }`;

  return (
    <div
      className="
        sticky top-0 z-50
        bg-base-100/80 backdrop-blur-md
        border-b border-base-300 shadow-sm
      "
    >
      <div className="navbar max-w-7xl mx-auto px-4 py-3">

        {/* LEFT */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              ☰
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-lg shadow-md mt-3 w-52 p-2 border">
              <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
              <li><NavLink to="/allCrops" className={linkClass}>All Crops</NavLink></li>
              <li><NavLink to="/aboutUs" className={linkClass}>About Us</NavLink></li>
              <li><NavLink to="/events" className={linkClass}>Events</NavLink></li>
              <li><NavLink to="/marketplace" className={linkClass}>Market Place</NavLink></li>
              <li><NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink></li>
              <li>
                <NavLink to="/premiumFarmers" className={premiumLinkClass}>
                  <GiFarmer className="text-yellow-500" />
                  Premium Farmers
                </NavLink>
              </li>
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Cropzen" className="w-9 h-9" />
            <span className="text-2xl font-extrabold italic text-green-700">
              Cropzen
            </span>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4">
            <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/allCrops" className={linkClass}>All Crops</NavLink></li>       
            <li><NavLink to="/aboutUs" className={linkClass}>About Us</NavLink></li>
            <li><NavLink to="/events" className={linkClass}>Events</NavLink></li>
            <li><NavLink to="/marketplace" className={linkClass}>Market News</NavLink></li>
            <li><NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink></li>
            <li>
              <NavLink to="/premiumFarmers" className={premiumLinkClass}>
                <GiFarmer className="text-yellow-500" />
                Premium Farmers
              </NavLink>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end flex items-center gap-4">

          {/* USER AVATAR */}
          <div className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-green-600 text-3xl" />
            )}
          </div>

          {/* AUTH BUTTON */}
          {user ? (
            <button
              onClick={handleSignOut}
              className="btn bg-green-600 text-white hover:bg-green-700"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/auth/login">
              <button className="btn bg-green-600 text-white hover:bg-green-700">
                Login
              </button>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;