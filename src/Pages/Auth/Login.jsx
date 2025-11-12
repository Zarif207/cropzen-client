import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError(""); // clear previous error

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "Login Successful!",
          text: `Welcome back, ${result.user.displayName || "Farmer"} 🌾`,
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
        e.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.error(error);
        setError("Invalid email or password.");
        Swal.fire({
          title: "Login Failed!",
          text: "Invalid email or password. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "Google Sign-In Successful!",
          text: `Welcome, ${result.user.displayName || "User"} 👋`,
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Google Sign-In Failed!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      });
  };

  return (
    <section className="flex items-center justify-center h-[700px]">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md border border-green-100">
        <h2 className="text-3xl font-extrabold text-green-700 text-center mb-2">
          Login to Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Access your farming dashboard 🌿
        </p>

        <form onSubmit={handleLogIn} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <div className="text-right mt-2">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-green-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full border border-gray-300 hover:border-green-400 rounded-lg py-3 flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-md"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-gray-700 font-medium">Login with Google</span>
        </button>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;