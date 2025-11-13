import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FiEdit3, FiUser, FiMail, FiMapPin, FiCamera } from "react-icons/fi";

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext); // Ensure updateUserProfile is available in AuthContext
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [location, setLocation] = useState(user?.location || "");

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ displayName: name, photoURL });
      // You can also send updated info to your backend if needed here
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
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
            <label className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition">
              <FiCamera />
              <input
                type="text"
                className="hidden"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Photo URL"
              />
            </label>
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

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="e.g., Dhaka, Bangladesh"
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
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Save Changes
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
              {location && (
                <div className="flex items-center gap-2 text-lg">
                  <FiMapPin className="text-green-600" />
                  <span>{location}</span>
                </div>
              )}

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