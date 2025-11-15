import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {})
      .catch((err) => console.error(err));
  };

  const linkClass = ({ isActive }) =>
    `relative font-medium transition duration-200 ${
      isActive
        ? "text-green-700 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-green-600"
        : "text-gray-700 hover:text-green-600"
    }`;

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4 py-3">
        {/* Left side */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white rounded-lg shadow-md mt-3 w-52 p-2 border border-gray-100"
            >
              <li>
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/allCrops" className={linkClass}>
                  All Crops
                </NavLink>
              </li>

              {user && (
                <>
                  <li>
                    <NavLink to="/addCrops" className={linkClass}>
                      Add Crops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/myPosts" className={linkClass}>
                      My Posts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/myInterests" className={linkClass}>
                      My Interests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/myProfile" className={linkClass}>
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className=" normal-case text-2xl font-extrabold italic text-green-700 tracking-wide"
          >
            Cropzen
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 text-gray-700">
            <li>
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/allCrops" className={linkClass}>
                All Crops
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink to="/addCrops" className={linkClass}>
                    Add Crops
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/myPosts" className={linkClass}>
                    My Posts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/myInterests" className={linkClass}>
                    My Interests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/myProfile" className={linkClass}>
                    My Profile
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Right side */}
        <div className="navbar-end flex items-center gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-600 flex items-center justify-center bg-white">
            {user?.photoURL ? (
              <img
                referrerPolicy="no-referrer"
                src={user.photoURL}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-green-600 text-3xl" />
            )}
          </div>

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={handleSignOut}
              className="btn bg-green-600 text-white border-none hover:bg-green-700 transition duration-300"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/auth/login">
              <button className="btn bg-green-600 text-white border-none hover:bg-green-700 transition duration-300">
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