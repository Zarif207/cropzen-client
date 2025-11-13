import React from "react";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4">
      {/* 404 Number */}
      <h1 className="text-[120px] md:text-[160px] font-extrabold text-green-700/20 mb-4">
        404
      </h1>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
        Page Not Found
      </h2>

      {/* Message */}
      <p className="text-gray-600 max-w-lg mx-auto mb-10">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition"
        >
          <Home size={18} />
          Back to Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 border-2 border-green-600 text-green-700 hover:bg-green-100 font-medium px-6 py-3 rounded-lg transition"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error404;