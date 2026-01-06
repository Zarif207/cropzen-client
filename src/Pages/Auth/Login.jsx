import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaLeaf, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");

    signInUser(email, password)
      .then((result) => {
        Swal.fire({
          title: "Login Successful!",
          text: `Welcome back, ${result.user.displayName || "Farmer"} 🌾`,
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
        navigate(location.state || "/");
      })
      .catch(() => {
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
        Swal.fire({
          title: "Google Sign-In Successful!",
          text: `Welcome, ${result.user.displayName || "User"} 👋`,
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
        navigate(location.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Google Sign-In Failed!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      });
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden py-12">
      
      {/* BACKGROUND BLOBS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-[420px] h-[420px] bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-3xl opacity-60 animate-blob animation-delay-2000"></div>

        <FaLeaf className="absolute top-32 right-1/4 text-green-300 text-4xl opacity-40 animate-float" />
        <FaStar className="absolute bottom-40 left-1/4 text-emerald-300 text-3xl opacity-40 animate-float animation-delay-1000" />
      </div>

      {/* CARD */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl p-12 w-full max-w-lg border-2 border-white/60 backdrop-blur-xl">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl shadow-xl mb-5">
            <FaLeaf className="text-white text-3xl animate-pulse" />
          </div>

          <h2 className="text-5xl font-black mb-2 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            Login to continue your journey <FaLeaf className="text-green-500" />
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogIn} className="space-y-6">
          
          {/* EMAIL */}
          <div className="group">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <FaEnvelope className="text-green-600 text-sm" />
                </div>
              </div>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                required
                className="w-full pl-[4.5rem] pr-5 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-gray-50"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="group">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <FaLock className="text-green-600 text-sm" />
                </div>
              </div>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                className="w-full pl-[4.5rem] pr-16 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-gray-50"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-semibold">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold py-5 rounded-2xl transition hover:scale-[1.02] shadow-xl"
          >
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-8">
          <hr className="grow border-gray-300" />
          <span className="mx-5 text-gray-500 text-sm font-bold">OR</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full border-2 border-gray-200 bg-white rounded-2xl py-4 flex items-center justify-center gap-3 hover:border-green-300 hover:shadow-xl transition"
        >
          <FcGoogle size={26} />
          Continue with Google
        </button>

        <p className="text-center text-gray-600 mt-8 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-green-600 font-bold hover:underline"
          >
            Register Now →
          </Link>
        </p>
      </div>

      {/* SAME ANIMATIONS AS REGISTER */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -40px) scale(1.1); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
    </section>
  );
};

export default Login;