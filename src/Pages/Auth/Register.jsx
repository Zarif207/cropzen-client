import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router"; // you can remove this if not using router
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const displayName = event.target.displayName.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    toast.loading("Creating user...", { id: "create-user" });

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(displayName, photoURL);
        toast.success("User created successfully!", { id: "create-user" });
        navigate(location?.state || "/"); // optional redirect
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
          Register Now!
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="displayName"
              placeholder="Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Image URL"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Register
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="grow border-gray-300" />
          <span className="mx-4 text-gray-500">OR</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 transition"
        >
          Google Sign-In
        </button>

        <p className="text-center text-gray-600 mb-8 mt-5">
          Already have an account?{" "}
          <Link
            to={"/auth/login"}
            className="text-purple-500 cursor-pointer hover:underline"
          >
            Login Now
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;