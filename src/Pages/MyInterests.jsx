import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

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
        .catch((err) => {
          console.error("Error fetching interests:", err);
          setLoading(false);
        });
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
              Swal.fire({
                title: "Deleted!",
                text: "Your interest has been removed.",
                icon: "success",
                confirmButtonColor: "#16a34a",
              });
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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-green-700 mb-2">
          My Interests
        </h2>
        <p className="text-gray-500">
          You have shown interest in{" "}
          <span className="text-green-600 font-semibold">
            {interests.length}
          </span>{" "}
          Crop{interests.length !== 1 && "s"}.
        </p>
      </div>

      {interests.length === 0 ? (
        <div className="text-center text-gray-500 text-lg my-50">
          You haven't shown interest in any crops yet.
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none">Sort by Price</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-2xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="py-4 px-6 rounded-tl-2xl text-lg font-semibold">
                    SL No.
                  </th>
                  <th className="py-4 px-6 text-lg font-semibold">Crop</th>
                  <th className="py-4 px-6 text-lg font-semibold">Seller</th>
                  <th className="py-4 px-6 text-lg font-semibold">Quantity</th>
                  <th className="py-4 px-6 text-lg font-semibold">Price</th>
                  <th className="py-4 px-6 text-lg font-semibold">Status</th>
                  <th className="py-4 px-6 rounded-tr-2xl text-lg font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedInterests.map((interest, index) => (
                  <tr
                    key={interest._id}
                    className="hover:bg-gray-50 transition duration-200 border-b border-gray-200"
                  >
                    <td className="py-4 px-6 font-semibold text-gray-700">
                      {index + 1}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            interest.crop?.image ||
                            "https://via.placeholder.com/80"
                          }
                          alt="Crop"
                          className="h-14 w-14 rounded-lg object-cover shadow-sm border border-gray-200"
                        />
                        <span className="font-bold text-gray-800">
                          {interest.crop?.name || "Unknown Crop"}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-gray-700">
                      {interest.crop?.owner?.ownerName || "Unknown Seller"}
                    </td>

                    <td className="py-4 px-6 font-semibold text-gray-800">
                      {interest.quantity || 0}
                    </td>

                    <td className="py-4 px-6 font-semibold text-green-700">
                      ৳{interest.crop?.pricePerUnit || 0}
                    </td>

                    {/* STATUS BADGES */}
                    <td className="py-4 px-6">
                      {interest.status === "pending" && (
                        <span className="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm">
                          Pending
                        </span>
                      )}

                      {interest.status === "accepted" && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">
                          Accepted
                        </span>
                      )}

                      {interest.status === "rejected" && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
                          Rejected
                        </span>
                      )}
                    </td>

                    {/* ACTION COLUMN */}
                    <td className="py-4 px-6 text-center">
                      {interest.status === "pending" ? (
                        <button
                          onClick={() =>
                            handleRemoveInterest(interest._id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition"
                        >
                          Remove
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm italic">
                      
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyInterests;