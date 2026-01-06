import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { FaSeedling } from "react-icons/fa";

const MyInterests = () => {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://cropzen.vercel.app/interest?email=${user.email}`)
        .then((res) => res.json())
        .then(async (data) => {
          const enrichedData = await Promise.all(
            data.map(async (interest) => {
              try {
                const res = await fetch(
                  `https://cropzen.vercel.app/crops/${interest.cropId}`
                );
                const crop = await res.json();
                return { ...interest, crop };
              } catch {
                return { ...interest, crop: null };
              }
            })
          );
          setInterests(enrichedData);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  const sortedInterests = [...interests].sort((a, b) => {
    const priceA = a.crop?.pricePerUnit || 0;
    const priceB = b.crop?.pricePerUnit || 0;
    if (sortOrder === "lowToHigh") return priceA - priceB;
    if (sortOrder === "highToLow") return priceB - priceA;
    return 0;
  });

  const handleRemoveInterest = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://cropzen.vercel.app/interest/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire("Deleted!", "Your interest has been removed.", "success");
              setInterests((prev) => prev.filter((i) => i._id !== _id));
            }
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-green-700 font-semibold text-lg animate-pulse">
          Loading your interests...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
      {/* HEADER */}
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-1">
          My Interests
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          You have shown interest in{" "}
          <span className="text-green-600 font-semibold">
            {interests.length}
          </span>{" "}
          Crop{interests.length !== 1 && "s"}.
        </p>
      </div>

      {interests.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          You haven't shown interest in any crops yet.
        </div>
      ) : (
        <>
          {/* SORT */}
          <div className="flex justify-end mb-3">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-green-500"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none">Sort by Price</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

          {/* DESKTOP TABLE VIEW */}
          <div className="hidden lg:block overflow-x-auto bg-white shadow-md rounded-2xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-lg">SL No.</th>
                  <th className="py-3 px-4 text-lg">Crop</th>
                  <th className="py-3 px-4 text-lg">Seller</th>
                  <th className="py-3 px-4 text-lg">Quantity</th>
                  <th className="py-3 px-4 text-lg">Price</th>
                  <th className="py-3 px-4 text-lg">Status</th>
                  <th className="py-3 px-4 text-lg text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {sortedInterests.map((interest, index) => (
                  <tr
                    key={interest._id}
                    className="hover:bg-gray-50 transition border-b border-gray-200"
                  >
                    <td className="py-3 px-4 font-semibold">
                      {index + 1}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {interest.crop?.image ? (
                          <img
                            src={interest.crop.image}
                            alt="Crop"
                            className="h-14 w-14 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-14 w-14 bg-gray-100 flex items-center justify-center rounded-lg">
                            <FaSeedling className="text-green-600" />
                          </div>
                        )}
                        <span className="font-bold">
                          {interest.crop?.name || "Unknown Crop"}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {interest.crop?.owner?.ownerName || "Unknown Seller"}
                    </td>

                    <td className="py-3 px-4 font-semibold">
                      {interest.quantity || 0}
                    </td>

                    <td className="py-3 px-4 font-semibold text-green-700">
                      ৳{interest.crop?.pricePerUnit || 0}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm text-white ${
                          interest.status === "pending"
                            ? "bg-yellow-400"
                            : interest.status === "accepted"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {interest.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      {interest.status === "pending" && (
                        <button
                          onClick={() => handleRemoveInterest(interest._id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE/TABLET CARD VIEW */}
          <div className="lg:hidden space-y-4">
            {sortedInterests.map((interest, index) => (
              <div
                key={interest._id}
                className="bg-white shadow-md rounded-2xl border border-gray-200 p-4"
              >
                {/* SL Number Badge */}
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    #{index + 1}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-lg text-sm text-white ${
                      interest.status === "pending"
                        ? "bg-yellow-400"
                        : interest.status === "accepted"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {interest.status}
                  </span>
                </div>

                {/* Crop Info */}
                <div className="flex items-start gap-3 mb-4">
                  {interest.crop?.image ? (
                    <img
                      src={interest.crop.image}
                      alt="Crop"
                      className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gray-100 flex items-center justify-center rounded-lg flex-shrink-0">
                      <FaSeedling className="text-green-600 text-2xl" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">
                      {interest.crop?.name || "Unknown Crop"}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      Seller: {interest.crop?.owner?.ownerName || "Unknown"}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Quantity</p>
                    <p className="font-semibold text-gray-800">
                      {interest.quantity || 0}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Price</p>
                    <p className="font-semibold text-green-700">
                      ৳{interest.crop?.pricePerUnit || 0}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                {interest.status === "pending" && (
                  <button
                    onClick={() => handleRemoveInterest(interest._id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
                  >
                    Remove Interest
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyInterests;