import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const MyInterests = () => {
  const { user } = use(AuthContext);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/interest?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setInterests(data);
        });
    }
  }, [user?.email]);

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
        fetch(`http://localhost:3000/interest/${_id}`, {
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
              const remainingInterest = interests.filter(
                (interest) => interest._id !== _id
              );
              setInterests(remainingInterest);
            }
          });
      }
    });
  };

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
        <div className="text-center text-gray-500 text-lg">
          You haven't shown interest in any crops yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-6">
          <table className="table w-full">
            <thead className="bg-green-600 text-white rounded-t-2xl">
              <tr>
                <th>#</th>
                <th>Crop</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {interests.map((interest, index) => (
                <tr
                  key={interest._id}
                  className="hover:bg-green-50 transition duration-200"
                >
                  <td className="font-semibold text-gray-600">
                    {index + 1}
                  </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={interest.userImage}
                            alt="Crop"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">
                          {interest.userName}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="text-gray-700">
                    Wyman-Ledner
                    <br />
                    <span className="badge badge-ghost badge-sm mt-1">
                      Community Specialist
                    </span>
                  </td>

                  <td className="font-semibold text-green-700">
                    ${interest.interest}
                  </td>

                  <td>
                    {interest.status === "pending" ? (
                      <span className="badge badge-warning text-white px-3 py-1 rounded-lg">
                        Pending
                      </span>
                    ) : (
                      <span className="badge badge-success text-white px-3 py-1 rounded-lg">
                        {interest.status}
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => handleRemoveInterest(interest._id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none rounded-lg"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyInterests;