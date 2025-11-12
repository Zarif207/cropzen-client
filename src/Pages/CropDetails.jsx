import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const CropDetails = () => {
  const { id: cropId } = useParams();
  const [interested, setInterested] = useState([]);
  const interestModalRef = useRef(null);
  const { user } = useContext(AuthContext);

  const handleInterestModalOpen = () => {
    interestModalRef.current.showModal();
  };

  useEffect(() => {
    fetch(`http://localhost:3000/crops/interest/${cropId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Interested for this Crops", data);
        setInterested(data);
      });
  }, [cropId]);

  const handleInterestSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const interest = e.target.interest.value;
    const quantity = e.target.quantity.value;
    const message = e.target.message.value;

    const newInterest = {
      cropId: cropId,
      userName: name,
      userEmail: email,
      userImage: user?.photoURL,
      interest,
      quantity,
      message,
      status: "pending",
    };

    fetch("http://localhost:3000/interest", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newInterest),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          interestModalRef.current.close();
          Swal.fire({
            title: "Interest Submitted!",
            icon: "success",
            draggable: true,
          });
          newInterest.id = data.insertedId;
          const newInterested = [...interested, newInterest];
          newInterested.sort((a, b) => Number(b.interest) - Number(a.interest));
          setInterested(newInterested);
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Crop Info */}
      <div className="grid md:grid-cols-2 gap-8 bg-base-200 p-6 rounded-2xl shadow-md">
        {/* Left content (image) */}
        <div className="flex justify-center items-center">
          <img
            src="https://img.freepik.com/free-photo/close-up-farmer-holding-rice-plant_1150-11120.jpg"
            alt="Crop"
            className="rounded-xl w-full max-h-[400px] object-cover"
          />
        </div>

        {/* Right content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-neutral">
            Premium Rice Crop
          </h2>
          <p className="text-gray-500">
            High-quality rice from sustainable organic farms. Well-nourished and
            pesticide-free.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="badge badge-outline badge-primary">Organic</span>
            <span className="badge badge-outline badge-secondary">In Stock</span>
          </div>

          <div className="bg-base-100 p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500">Starting From</p>
            <p className="text-2xl font-semibold text-green-600">৳ 1200 / ton</p>
          </div>

          <button
            onClick={handleInterestModalOpen}
            className="btn bg-gradient-to-r from-green-500 to-lime-500 text-white w-full mt-4 hover:from-green-600 hover:to-lime-600"
          >
            Submit Interest
          </button>
        </div>
      </div>

      {/* Interest Modal */}
      <dialog
        ref={interestModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-base-100 shadow-xl rounded-xl">
          <h3 className="font-bold text-lg mb-2 text-green-600">
            Give the Best Offer!
          </h3>
          <p className="text-gray-500 mb-4">
            Offer something the seller cannot resist.
          </p>

          <form onSubmit={handleInterestSubmit} className="space-y-3">
            {/* Name */}
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              readOnly
              defaultValue={user?.displayName || ""}
            />

            {/* Email */}
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              readOnly
              defaultValue={user?.email || ""}
            />

            {/* Interest */}
            <label className="block text-sm font-medium">
              Interested Amount (৳)
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              name="interest"
              placeholder="Enter your offer price"
              required
            />

            {/* Quantity */}
            <label className="block text-sm font-medium">Quantity (kg)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              name="quantity"
              placeholder="Enter quantity you want to buy"
              required
            />

            {/* Message */}
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              className="textarea textarea-bordered w-full"
              placeholder="Write a short message to the seller"
            ></textarea>

            <button
              className="btn bg-green-600 hover:bg-green-700 text-white w-full mt-4"
              type="submit"
            >
              Place Your Interest
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Interested Table */}
      <div className="bg-base-200 p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-neutral">
          Interested Buyers <span className="text-green-600">({interested.length})</span>
        </h3>

        <div className="overflow-x-auto rounded-lg border border-base-300">
          <table className="table table-zebra w-full">
            <thead className="bg-base-300 text-base font-semibold">
              <tr>
                <th>SL No.</th>
                <th>Buyer</th>
                <th>Email</th>
                <th>Offer (৳)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {interested.map((interest, index) => (
                <tr key={interest._id} className="hover">
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10">
                          <img
                            src={interest.userImage || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                            alt="buyer"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">
                          {interest.userName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {interest.quantity} kg
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{interest.userEmail}</td>
                  <td className="text-green-600 font-semibold">
                    ৳ {interest.interest}
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs text-green-600 hover:bg-green-100">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
              {interested.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    No interests yet. Be the first to offer!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;