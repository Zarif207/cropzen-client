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
        photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        confirmButtonColor: "#16a34a",
      });

      setIsEditing(false);
    } catch (error) {
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
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-green-100 p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-green-700">My Profile</h2>
          <p className="text-gray-500 mt-2">
            Manage your personal information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img
                src={
                  photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-green-200 shadow-lg"
              />

              {isEditing && (
                <div className="absolute bottom-2 right-2 bg-green-600 p-2 rounded-full text-white cursor-pointer hover:bg-green-700 transition">
                  <FiCamera />
                </div>
              )}
            </div>

            <span className="mt-4 text-sm text-gray-500">
              Profile Picture
            </span>
          </div>

          {/* Info / Form */}
          <div className="md:col-span-2">
            {isEditing ? (
              <form
                onSubmit={handleSave}
                className="bg-green-50 border border-green-100 rounded-2xl p-6 space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none bg-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 rounded-full text-white font-medium transition ${
                      loading
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <FiUser className="text-green-600 text-xl" />
                  <span className="text-lg font-semibold text-gray-800">
                    {user?.displayName}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FiMail className="text-green-600 text-xl" />
                  <span className="text-gray-700">{user?.email}</span>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition shadow-md"
                >
                  <FiEdit3 />
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;