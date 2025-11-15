import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FiEdit3, FiUser, FiMail, FiCamera } from "react-icons/fi";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information has been updated successfully.",
        confirmButtonColor: "#16a34a",
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16 px-6 bg-white my-20">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm border border-green-100 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center tracking-tight">
          My Profile
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <img
              src={
                photoURL ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-green-200 object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
            />

            {isEditing && (
              <div className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition">
                <FiCamera className="text-lg" />
              </div>
            )}
          </div>

          <div className="flex-1 w-full">
            {isEditing ? (
              <form
                onSubmit={handleSave}
                className="space-y-5 bg-white border border-green-100 p-5 rounded-xl shadow-inner"
              >
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                      loading
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 bg-white border border-green-100 p-5 rounded-xl shadow-inner">
                <div className="flex items-center gap-3 text-lg">
                  <FiUser className="text-green-600 text-xl" />
                  <span className="font-semibold text-gray-800">
                    {user?.displayName}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <FiMail className="text-green-600 text-xl" />
                  <span className="text-gray-800">{user?.email}</span>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition font-medium shadow-md hover:shadow-lg"
                >
                  <FiEdit3 /> Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
