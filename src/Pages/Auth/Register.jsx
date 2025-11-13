import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaUserAlt, FaEnvelope, FaLock, FaImage } from "react-icons/fa";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    const displayName = event.target.displayName.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // ✅ Password validation
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return;
    }

    setPasswordError("");
    toast.loading("Creating user...", { id: "create-user" });

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(displayName, photoURL);
        toast.success("User created successfully!", { id: "create-user" });

        // Save user to database
        const newUser = {
          name: displayName,
          email,
          photo: photoURL,
        };
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => navigate(location?.state || "/"))
          .catch(() =>
            toast.error("Failed to save user data.", { id: "create-user" })
          );
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, { id: "create-user" });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => console.log("data after user save", data))
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-3">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
              <FaUserAlt className="text-gray-500 mr-2" />
              <input
                type="text"
                name="displayName"
                placeholder="Enter your name"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Photo URL
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
              <FaImage className="text-gray-500 mr-2" />
              <input
                type="text"
                name="photoURL"
                placeholder="Link to your photo"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="********"
                className="w-full outline-none"
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Register
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-3 transition hover:bg-gray-50"
        >
          <FcGoogle size={22} /> Register with Google
        </button>

        {/* Already have account */}
        <p className="text-center text-gray-600 mb-8 mt-5">
          Already have an account?{" "}
          <Link
            to={"/auth/login"}
            className="text-green-600 font-semibold hover:underline"
          >
            Login Now
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;