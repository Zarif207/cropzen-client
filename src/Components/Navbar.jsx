import React, { use } from "react";
import { Link, NavLink } from "react-router"; // ✅ same as your code
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then()
      .catch();
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className="hover:text-green-600 transition font-medium">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allCrops"
          className="hover:text-green-600 transition font-medium"
        >
          All Crops
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/addCrops"
              className="hover:text-green-600 transition font-medium"
            >
              Add Crops
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myPosts"
              className="hover:text-green-600 transition font-medium"
            >
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myInterests"
              className="hover:text-green-600 transition font-medium"
            >
              My Interests
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4 py-3">
        {/* Left side */}
        <div className="navbar-start">
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
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-2xl font-extrabold text-green-700 tracking-wide">
            Agrikon<span className="text-green-500">.</span>
          </a>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 text-gray-700">
            {links}
          </ul>
        </div>

        {/* Right side */}
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleSignOut}
              className="btn bg-green-600 text-white border-none hover:bg-green-700 transition duration-300"
            >
              Sign Out
            </button>
          ) : (
            <Link to={"/auth/login"}>
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