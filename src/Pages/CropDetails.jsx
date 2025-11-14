import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import { FiSend, FiX } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { GiFarmer } from "react-icons/gi";

const CropDetails = () => {
  const { id: cropId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [crop, setCrop] = useState(null);
  const [interests, setInterests] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState("highToLow");

  // Load crop
  useEffect(() => {
    fetch(`https://cropzen.vercel.app/crops/${cropId}`)
      .then((res) => res.json())
      .then((data) => setCrop(data))
      .catch((err) => console.error("Error fetching crop:", err));
  }, [cropId]);

  // Load interests
  useEffect(() => {
    fetch("https://cropzen.vercel.app/interest")
      .then((res) => res.json())
      .then((data) => {
        const cropInterests = data?.filter((i) => i?.cropId === cropId) || [];
        setInterests(cropInterests);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching interests:", err));
  }, [cropId]);

  const isOwner = user?.email === crop?.owner?.ownerEmail;
  const totalPrice = price ? quantity * price : 0;

  const sortedInterests = [...(interests || [])].sort((a, b) => {
    const totalA = (a?.quantity || 0) * (a?.price || crop?.pricePerUnit || 0);
    const totalB = (b?.quantity || 0) * (b?.price || crop?.pricePerUnit || 0);

    return sortOrder === "highToLow" ? totalB - totalA : totalA - totalB;
  });

  // Handle submit interest
  const handleInterestSubmit = async (e) => {
    e.preventDefault();

    if (quantity < 1) {
      Swal.fire("Invalid Quantity", "Quantity must be at least 1.", "warning");
      return;
    }
    if (!price || price <= 0) {
      Swal.fire("Invalid Price", "Please enter a valid bid price.", "warning");
      return;
    }

    const interestData = {
      cropId,
      userEmail: user?.email,
      userName: user?.displayName,
      quantity,
      message,
      price,
      status: "pending",
    };

    const confirm = await Swal.fire({
      title: "Confirm Your Bid?",
      text: `You're offering ${price}৳ per ${crop?.unit} for ${quantity} ${crop?.unit} (Total: ${totalPrice}৳)`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit!",
      confirmButtonColor: "#22c55e",
    });

    if (!confirm.isConfirmed) return;

    fetch("https://cropzen.vercel.app/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(interestData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success!", "Interest submitted successfully!", "success");
        setInterests((prev) => [...(prev || []), interestData]);
        setShowModal(false);
      })
      .catch((err) => console.error(err));
  };

  // Accept / Reject
  const handleStatusChange = (interestId, status) => {
    if (!isOwner) return;

    fetch(`https://cropzen.vercel.app/interest/${interestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cropsId: cropId, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          Swal.fire("Updated!", `Interest marked as ${status}`, "success");

          setInterests((prev) =>
            prev?.map((i) => (i?._id === interestId ? { ...i, status } : i))
          );

          if (status === "accepted") {
            const acceptedInterest = interests?.find(
              (i) => i?._id === interestId
            );
            if (acceptedInterest) {
              setCrop((prev) => ({
                ...prev,
                quantity: (prev?.quantity || 0) - (acceptedInterest?.quantity || 0),
              }));
            }
          }
        } else {
          Swal.fire("Error", "Failed to update status", "error");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };

  if (loading || !crop)
    return (
      <div className="flex justify-center items-center h-[70vh] text-green-700 font-semibold text-xl">
        Loading crop details...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-full font-medium transition-all"
        >
          <FaArrowLeft /> Back to All Crops
        </button>
      </div>

      {/* Crop Info */}
      <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-2xl shadow-md border border-green-100">
        <img
          src={crop?.image}
          alt={crop?.name}
          className="rounded-xl w-full max-h-[400px] object-cover shadow-md"
        />

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold text-green-700">{crop?.name}</h2>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {crop?.type}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">{crop?.description}</p>

          <div className="flex items-center gap-4">
            <p className="text-xl font-semibold text-green-600">
              ৳ {crop?.pricePerUnit} / {crop?.unit}
            </p>
            <p className="text-gray-500">
              Available: {crop?.quantity ?? "N/A"}
            </p>
          </div>

          <p className="text-gray-700 font-medium flex items-center gap-2">
            <IoLocationSharp className="text-red-600 text-lg" />
            {crop?.location}
          </p>

          <p className="text-gray-700 flex items-center gap-2">
            <GiFarmer className="text-green-600 text-lg" />
            <span className="font-semibold">
              {crop?.owner?.ownerName || "Unknown Farmer"}
            </span>
          </p>

          {!isOwner && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all"
            >
              <FiSend /> Send Interest
            </button>
          )}
        </div>
      </div>

      {/* Interest Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              <FiX />
            </button>

            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Send Your Interest
            </h3>

            <form onSubmit={handleInterestSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Quantity ({crop?.unit})
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Your Bid Price (৳ per {crop?.unit})
                </label>
                <input
                  type="number"
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a short message..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2 h-24 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div className="flex justify-between items-center text-lg font-medium text-gray-700">
                <span>Total Offer:</span>
                <span className="text-green-600 font-bold">
                  ৳ {totalPrice || 0}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiSend /> Submit Interest
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Received Interests */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-green-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-green-700">
            Received Interests ({interests?.length || 0})
          </h3>

          {(interests?.length || 0) > 0 && (
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="highToLow">High to Low</option>
              <option value="lowToHigh">Low to High</option>
            </select>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-left">
            <thead className="bg-green-50 text-green-700 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2">Buyer Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price (৳)</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Status</th>
                {isOwner && <th className="px-4 py-2 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {sortedInterests?.length === 0 ? (
                <tr>
                  <td
                    colSpan={isOwner ? 7 : 6}
                    className="text-center text-gray-500 py-6 italic"
                  >
                    No interests yet for this crop.
                  </td>
                </tr>
              ) : (
                sortedInterests?.map((i) => (
                  <tr
                    key={i?._id || Math.random()}
                    className="hover:bg-gray-50 border-t border-gray-200"
                  >
                    <td className="px-4 py-2">{i?.userName}</td>
                    <td className="px-4 py-2">{i?.quantity}</td>
                    <td className="px-4 py-2">{i?.price}</td>
                    <td className="px-4 py-2 font-medium text-green-600">
                      ৳ {(i?.quantity || 0) * (i?.price || crop?.pricePerUnit || 0)}
                    </td>
                    <td className="px-4 py-2">{i?.message}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          i?.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : i?.status === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {i?.status}
                      </span>
                    </td>

                    {isOwner && i?.status === "pending" && (
                      <td className="flex gap-2 justify-center py-2">
                        <button
                          onClick={() => handleStatusChange(i?._id, "accepted")}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(i?._id, "rejected")}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;