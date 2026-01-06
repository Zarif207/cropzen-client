import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import {
  FaUserAlt,
  FaEnvelope,
  FaLock,
  FaImage,
  FaEyeSlash,
  FaEye,
  FaStar,
  FaLeaf,
} from "react-icons/fa";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

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
        fetch("https://cropzen.vercel.app/users", {
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
        fetch("https://cropzen.vercel.app/users", {
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
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-gradient-to-br from-teal-200 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
        
        {/* Floating Decorative Elements */}
        <FaLeaf className="absolute top-32 right-1/4 text-green-300 text-4xl opacity-40 animate-float" />
        <FaStar className="absolute bottom-40 left-1/4 text-emerald-300 text-3xl opacity-40 animate-float animation-delay-1000" />
        <FaLeaf className="absolute top-2/3 right-1/3 text-teal-300 text-5xl opacity-30 animate-float animation-delay-3000" />
      </div>

      <div className="relative bg-white rounded-[2rem] shadow-2xl p-12 w-full max-w-lg backdrop-blur-xl bg-opacity-98 border-2 border-white/50 transform transition-all duration-500 hover:shadow-[0_20px_80px_rgba(16,185,129,0.3)] hover:scale-[1.01]">
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-transparent rounded-bl-[3rem] rounded-tr-[2rem]"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-400/20 to-transparent rounded-tr-[3rem] rounded-bl-[2rem]"></div>

        {/* Header with Animated Icon */}
        <div className="text-center mb-10 relative">
          <div className="relative inline-block mb-5">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-12">
              <FaUserAlt className="text-white text-3xl animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-5xl font-black mb-3 relative">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">
              Create Account
            </span>
          </h2>
          <p className="text-gray-600 text-base flex items-center justify-center gap-2">
            <span>Join CropZen and grow with us</span>
            <FaLeaf className="text-green-500 animate-bounce" />
          </p>
        </div>

        <div onSubmit={handleRegister} className="space-y-6">
          {/* Name */}
          <div className="group">
            <label className="block text-gray-700 font-semibold mb-2.5 text-sm tracking-wide">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
                  <FaUserAlt className="text-green-600 text-sm" />
                </div>
              </div>
              <input
                type="text"
                name="displayName"
                placeholder="John Doe"
                className="w-full pl-[4.5rem] pr-5 py-4 border-2 border-gray-200 rounded-2xl outline-none transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-gradient-to-br from-gray-50 to-white text-gray-900 placeholder-gray-400 hover:border-green-300 hover:shadow-lg font-medium"
              />
            </div>
          </div>

          {/* Email */}
          <div className="group">
            <label className="block text-gray-700 font-semibold mb-2.5 text-sm tracking-wide">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
                  <FaEnvelope className="text-green-600 text-sm" />
                </div>
              </div>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                className="w-full pl-[4.5rem] pr-5 py-4 border-2 border-gray-200 rounded-2xl outline-none transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-gradient-to-br from-gray-50 to-white text-gray-900 placeholder-gray-400 hover:border-green-300 hover:shadow-lg font-medium"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div className="group">
            <label className="block text-gray-700 font-semibold mb-2.5 text-sm tracking-wide">
              Photo URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
                  <FaImage className="text-green-600 text-sm" />
                </div>
              </div>
              <input
                type="text"
                name="photoURL"
                placeholder="https://example.com/photo.jpg"
                className="w-full pl-[4.5rem] pr-5 py-4 border-2 border-gray-200 rounded-2xl outline-none transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-gradient-to-br from-gray-50 to-white text-gray-900 placeholder-gray-400 hover:border-green-300 hover:shadow-lg font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div className="group">
            <label className="block text-gray-700 font-semibold mb-2.5 text-sm tracking-wide">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
                  <FaLock className="text-green-600 text-sm" />
                </div>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full pl-[4.5rem] pr-16 py-4 border-2 border-gray-200 rounded-2xl outline-none transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-gradient-to-br from-gray-50 to-white text-gray-900 placeholder-gray-400 hover:border-green-300 hover:shadow-lg font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-green-600 transition-all duration-300 z-10 group/eye"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover/eye:bg-green-100 transition-all duration-300">
                  {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                </div>
              </button>
            </div>
            {passwordError && (
              <div className="mt-3 ml-2 flex items-start gap-2.5 text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-200">
                <span className="mt-0.5 text-base">⚠️</span>
                <span className="font-medium">{passwordError}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            onClick={handleRegister}
            className="relative w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold py-5 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] mt-8 shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative text-lg tracking-wide flex items-center justify-center gap-2">
              Create Account
              <FaStar className="animate-spin-slow" />
            </span>
          </button>
        </div>

        <div className="flex items-center my-8">
          <hr className="grow border-gray-300" />
          <span className="mx-5 text-gray-500 text-sm font-bold tracking-wider">
            OR
          </span>
          <hr className="grow border-gray-300" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full border-2 border-gray-200 bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white rounded-2xl py-4 flex items-center justify-center gap-3 transition-all duration-300 font-semibold text-gray-700 hover:border-green-300 hover:shadow-xl group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <FcGoogle size={26} className="relative group-hover:scale-110 transition-transform duration-300" />
          <span className="relative">Continue with Google</span>
        </button>

        <p className="text-center text-gray-600 mt-8 text-sm">
          Already have an account?{" "}
          <Link
            to={"/auth/login"}
            className="text-green-600 font-bold hover:text-green-700 hover:underline transition-colors decoration-2 underline-offset-4"
          >
            Login Now →
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Register;