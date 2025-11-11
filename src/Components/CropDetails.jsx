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

    console.log(cropId, quantity, message, name, email, interest);

    const newInterest = {
      cropId: cropId,
      userName: name,
      userEmail: email,
      interest,
      quantity,
      message,
      status: "pending",
    };

    console.log("New Interest:", newInterest);
    fetch("http://localhost:3000/interest", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newInterest),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after placing interest", data);
        if (data.insertedId) {
          interestModalRef.current.close();
          Swal.fire({
            title: "Interest Submitted!",
            icon: "success",
            draggable: true,
          });
        }
      });
  };

  return (
    <div>
      {/* Crop info */}
      <div>
        <div>{/* left content */}</div>

        <div>
          {/* right content */}
          <button onClick={handleInterestModalOpen} className="btn">
            Submit Interest
          </button>

          {/* Interest Modal */}
          <dialog
            ref={interestModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Give the best offer!</h3>
              <p className="py-4">Offer something the seller cannot resist</p>

              <form onSubmit={handleInterestSubmit}>
                <fieldset className="fieldset">
                  {/* name */}
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    readOnly
                    defaultValue={user?.displayName || ""}
                  />

                  {/* email */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    readOnly
                    defaultValue={user?.email || ""}
                  />

                  {/* interest */}
                  <label className="label">Interested Amount (৳)</label>
                  <input
                    type="text"
                    className="input"
                    name="interest"
                    placeholder="Enter your offer price"
                  />

                  {/* quantity */}
                  <label className="label">Quantity (kg)</label>
                  <input
                    type="number"
                    className="input"
                    name="quantity"
                    placeholder="Enter quantity you want to buy"
                  />

                  {/* message */}
                  <label className="label">Message to Seller</label>
                  <textarea
                    name="message"
                    className="textarea"
                    placeholder="Write a short message"
                  ></textarea>

                  <button className="btn btn-neutral mt-4" type="submit">
                    Place your interest
                  </button>
                </fieldset>
              </form>

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      {/* interest for crops */}
      <div>
        <h3>
          Interested For This Crop: <span>{interested.length}</span>
        </h3>
      </div>
    </div>
  );
};

export default CropDetails;
