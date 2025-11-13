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
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-2xl border border-green-100 mt-10">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        My Profile
      </h2>

      {/* Profile Card */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <img
            src={
              photoURL ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-green-200 object-cover shadow-md"
          />

          {isEditing && (
            <div className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition">
              <FiCamera />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4 w-full">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg text-white transition ${
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
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-2 text-lg">
                <FiUser className="text-green-600" />
                <span className="font-semibold">{user?.displayName}</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <FiMail className="text-green-600" />
                <span>{user?.email}</span>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
              >
                <FiEdit3 /> Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;