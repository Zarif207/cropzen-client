import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const MyInterests = () => {
  const { user } = use(AuthContext);
  const [interests, setInterests] = useState([]);
  console.log(user);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/interest?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Deleted");

        fetch(`http://localhost:3000/interest/${_id}`, {
          method: "DELETE",
          headers: {},
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Interest has been deleted.",
                icon: "success",
              });
              //
              const remainingInterest = interests.filter(
                (interest) => interest._id !== _id
              );
              setInterests(remainingInterest)
            }
          });
      }
    });
  };
  return (
    <div>
      <h3>my interest: {interests.length}</h3>

      {/* table  */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Crop</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {interests.map((interest, index) => (
              <tr key={interest._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={interest.userImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{interest.userName}</div>
                      {/* <div className="text-sm opacity-50">Brazil</div> */}
                    </div>
                  </div>
                </td>
                <td>
                  Wyman-Ledner
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Community Outreach Specialist
                  </span>
                </td>
                <td>{interest.interest}</td>
                <td>
                  {interest.status === "pending" ? (
                    <div className="badge badge-warning">
                      {interest.status}{" "}
                    </div>
                  ) : (
                    <div className="badge badge-succes">{interest.status} </div>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => handleRemoveInterest(interest._id)}
                    className="btn btn-ghost bg-red-500 text-white btn-xs"
                  >
                    Remove
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyInterests;
