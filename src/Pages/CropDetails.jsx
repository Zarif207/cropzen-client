import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import { FiSend, FiX } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { GiFarmer } from "react-icons/gi";
import { BsCurrencyDollar, BsBoxSeam } from "react-icons/bs";

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

  const hasSentInterest = interests.some((i) => i?.userEmail === user?.email);

  useEffect(() => {
    fetch(`https://cropzen.vercel.app/crops/${cropId}`)
      .then((res) => res.json())
      .then((data) => setCrop(data))
      .catch((err) => console.error("Error fetching crop:", err));
  }, [cropId]);

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

  const handleInterestSubmit = async (e) => {
    e.preventDefault();

    if (hasSentInterest) {
      Swal.fire(
        "Already Sent",
        "You've already sent an interest for this crop.",
        "info"
      );
      return;
    }

    if (quantity < 1) {
      Swal.fire("Invalid Quantity", "Quantity must be at least 1.", "warning");
      return;
    }

    if (quantity > crop?.quantity) {
      Swal.fire(
        "Quantity Not Available",
        `Only ${crop?.quantity} ${crop?.unit} available.`,
        "error"
      );
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
            const accepted = interests?.find((i) => i?._id === interestId);
            if (accepted) {
              setCrop((prev) => ({
                ...prev,
                quantity: (prev?.quantity || 0) - (accepted?.quantity || 0),
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
      <div className="flex flex-col justify-center items-center h-[70vh] bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-green-700 font-semibold text-lg animate-pulse">
          Loading crop details...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white hover:bg-green-50 text-green-700 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg border border-green-200"
        >
          <FaArrowLeft /> Back to All Crops
        </button>

        {/* MAIN CONTENT */}
        <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-2xl shadow-xl border border-green-100">
          {/* IMAGE */}
          <div className="relative group overflow-hidden rounded-xl">
            <img
              src={crop?.image}
              alt={crop?.name}
              className="rounded-xl w-full h-full max-h-[450px] object-cover shadow-md group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-green-700 shadow-lg border border-green-200">
              {crop?.type}
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-5">
            <h2 className="text-4xl font-bold text-green-700">{crop?.name}</h2>

            <p className="text-gray-600 leading-relaxed">{crop?.description}</p>

            {/* PRICE & STOCK */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-5 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <BsCurrencyDollar className="text-xl" />
                  <span className="text-sm font-semibold">Price</span>
                </div>
                <p className="text-2xl font-bold text-green-700">
                  ৳{crop?.pricePerUnit}
                  <span className="text-sm font-medium text-gray-600"> /{crop?.unit}</span>
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-5 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <BsBoxSeam className="text-xl" />
                  <span className="text-sm font-semibold">Available</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">
                  {crop?.quantity}
                  <span className="text-sm font-medium text-gray-600"> {crop?.unit}</span>
                </p>
              </div>
            </div>

            {/* LOCATION & FARMER */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <IoLocationSharp className="text-red-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Location</p>
                  <p className="text-gray-800 font-semibold">{crop?.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <GiFarmer className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Farmer</p>
                  <p className="text-gray-800 font-semibold">
                    {crop?.owner?.ownerName || "Unknown Farmer"}
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            {!isOwner && (
              <>
                {hasSentInterest ? (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-2">
                    <FaCheck className="text-red-600" />
                    <p className="text-red-600 font-semibold">
                      You've already sent an interest for this crop.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    <FiSend /> Send Interest
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl transition-colors"
              >
                <FiX />
              </button>

              <h3 className="text-2xl font-bold text-green-700 mb-6">
                Send Your Interest
              </h3>

              {hasSentInterest ? (
                <p className="text-red-600 font-semibold text-center py-6">
                  You've already sent an interest for this crop.
                </p>
              ) : (
                <form onSubmit={handleInterestSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Quantity ({crop?.unit})
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Your Bid Price (৳ per {crop?.unit})
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write a short message..."
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 h-24 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span className="text-gray-700">Total Offer:</span>
                      <span className="text-green-600 text-2xl">
                        ৳{totalPrice || 0}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <FiSend /> Submit Interest
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* INTERESTS TABLE */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-2xl font-bold text-green-700">
              Received Interests ({interests?.length || 0})
            </h3>

            {(interests?.length || 0) > 0 && (
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-2 text-gray-700 font-semibold focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              >
                <option value="highToLow">High to Low</option>
                <option value="lowToHigh">Low to High</option>
              </select>
            )}
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-green-50 text-green-700 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Buyer Name</th>
                  <th className="px-4 py-3 text-left font-bold">Quantity</th>
                  <th className="px-4 py-3 text-left font-bold">Price (৳)</th>
                  <th className="px-4 py-3 text-left font-bold">Total</th>
                  <th className="px-4 py-3 text-left font-bold">Message</th>
                  <th className="px-4 py-3 text-left font-bold">Status</th>
                  {isOwner && <th className="px-4 py-3 text-center font-bold">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {sortedInterests?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={isOwner ? 7 : 6}
                      className="text-center text-gray-500 py-8 italic"
                    >
                      No interests yet for this crop.
                    </td>
                  </tr>
                ) : (
                  sortedInterests?.map((i) => (
                    <tr
                      key={i?._id || Math.random()}
                      className="hover:bg-gray-50 border-t border-gray-200 transition-colors"
                    >
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        {i?.userName}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{i?.quantity}</td>
                      <td className="px-4 py-3 text-gray-700">{i?.price}</td>
                      <td className="px-4 py-3 font-bold text-green-600">
                        ৳{(i?.quantity || 0) * (i?.price || crop?.pricePerUnit || 0)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">
                        {i?.message || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
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
                        <td className="px-4 py-3">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleStatusChange(i?._id, "accepted")}
                              className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold transition-all flex items-center gap-1"
                            >
                              <FaCheck className="text-sm" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusChange(i?._id, "rejected")}
                              className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-all flex items-center gap-1"
                            >
                              <FaTimes className="text-sm" />
                              Reject
                            </button>
                          </div>
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
    </div>
  );
};

export default CropDetails;