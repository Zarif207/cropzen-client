import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import { FiSend, FiX } from "react-icons/fi";

const CropDetails = () => {
  const { id: cropId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [crop, setCrop] = useState(null);
  const [interests, setInterests] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [alreadyInterested, setAlreadyInterested] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch crop info
  useEffect(() => {
    fetch(`http://localhost:3000/crops/${cropId}`)
      .then((res) => res.json())
      .then((data) => setCrop(data))
      .catch((err) => console.error("Error fetching crop:", err));
  }, [cropId]);

  // ✅ Fetch interests for this crop
  useEffect(() => {
    if (!cropId) return;
    fetch(`http://localhost:3000/crops/interest/${cropId}`)
      .then((res) => res.json())
      .then((data) => {
        setInterests(data);
        if (data.some((i) => i.userEmail === user?.email)) {
          setAlreadyInterested(true);
        }
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching interests:", err));
  }, [cropId, user?.email]);

  const isOwner = user?.email === crop?.owner?.ownerEmail;
  const totalPrice = quantity * crop?.pricePerUnit;

  // ✅ Submit interest form
  const handleInterestSubmit = async (e) => {
    e.preventDefault();

    if (quantity < 1) {
      Swal.fire("Invalid Quantity", "Quantity must be at least 1.", "warning");
      return;
    }

    const interestData = {
      cropId,
      userEmail: user.email,
      userName: user.displayName,
      quantity,
      message,
      status: "pending",
    };

    const confirm = await Swal.fire({
      title: "Confirm Interest?",
      text: `You're offering interest for ${quantity} ${crop.unit} (${totalPrice}৳)`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit!",
      confirmButtonColor: "#22c55e",
    });

    if (!confirm.isConfirmed) return;

    fetch("http://localhost:3000/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(interestData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success!", "Interest submitted successfully!", "success");
        setInterests((prev) => [...prev, interestData]);
        setAlreadyInterested(true);
        setShowModal(false);
      })
      .catch((err) => console.error(err));
  };

  // ✅ Handle Accept/Reject (only works for owner)
  const handleStatusChange = (interestId, status) => {
    if (!isOwner) return; // safeguard for non-owner
    fetch(`http://localhost:3000/interests/${cropId}/${interestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Updated!", `Interest marked as ${status}`, "success");
        setInterests((prev) =>
          prev.map((i) => (i._id === interestId ? { ...i, status } : i))
        );
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
      {/* 🔙 Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-full font-medium transition-all"
        >
          <FaArrowLeft /> Back to All Crops
        </button>
      </div>

      {/* 🌾 Crop Details */}
      <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-2xl shadow-md border border-green-100">
        <img
          src={crop.image}
          alt={crop.name}
          className="rounded-xl w-full max-h-[400px] object-cover shadow-md"
        />

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold text-green-700">{crop.name}</h2>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {crop.type}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">{crop.description}</p>

          <div className="flex items-center gap-4">
            <p className="text-xl font-semibold text-green-600">
              ৳ {crop.pricePerUnit} / {crop.unit}
            </p>
            <p className="text-gray-500">Available: {crop.quantity}</p>
          </div>

          <p className="text-gray-700 font-medium">📍 {crop.location}</p>
          <p className="text-gray-700 flex items-center gap-2">
            👨‍🌾 <span className="font-semibold">{crop.owner?.ownerName}</span>
          </p>

          {!isOwner && !alreadyInterested && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all"
            >
              <FiSend /> Send Interest
            </button>
          )}

          {alreadyInterested && (
            <p className="text-gray-600 italic mt-3">
              ✅ You’ve already sent an interest for this crop.
            </p>
          )}
        </div>
      </div>

      {/* 💬 Interest Modal */}
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
                  Quantity ({crop.unit})
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
                <span>Total Price:</span>
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

      {/* 👀 Always show interest table */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-green-100">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">
          Received Interests ({interests.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-green-50 text-green-700">
              <tr>
                <th className="px-4 py-2">Buyer Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Status</th>
                {isOwner && <th className="px-4 py-2 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {interests.length === 0 ? (
                <tr>
                  <td
                    colSpan={isOwner ? 5 : 4}
                    className="text-center text-gray-500 py-6 italic"
                  >
                    No interests yet for this crop.
                  </td>
                </tr>
              ) : (
                interests.map((i) => (
                  <tr key={i._id} className="hover:bg-gray-50 border-t">
                    <td className="px-4 py-2">{i.userName}</td>
                    <td className="px-4 py-2">{i.quantity}</td>
                    <td className="px-4 py-2">{i.message}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          i.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : i.status === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {i.status}
                      </span>
                    </td>
                    {isOwner && (
                      <td className="flex gap-2 justify-center py-2">
                        <button
                          onClick={() => handleStatusChange(i._id, "accepted")}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(i._id, "rejected")}
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