import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const [myCrops, setMyCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);

  // ✅ Fetch only user's crops
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/crops?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyCrops(data))
        .catch((err) => console.error("Error fetching crops:", err));
    }
  }, [user?.email]);

  // 🗑 Delete crop
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This crop will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#16a34a",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/crops/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMyCrops((prev) => prev.filter((crop) => crop._id !== id));
              Swal.fire("Deleted!", "Your crop has been removed.", "success");
            }
          });
      }
    });
  };

  // ✏️ Handle Edit (PATCH)
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedName = form.name.value;
    const updatedPrice = parseFloat(form.price.value);

    fetch(`http://localhost:3000/crops/${selectedCrop._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: updatedName, price: updatedPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Crop details updated successfully.",
            icon: "success",
            confirmButtonColor: "#16a34a",
          });
          setMyCrops((prev) =>
            prev.map((crop) =>
              crop._id === selectedCrop._id
                ? { ...crop, name: updatedName, price: updatedPrice }
                : crop
            )
          );
          document.getElementById("editModal").close();
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🌾 My Crop Posts
      </h2>

      {myCrops.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          You haven't added any crops yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-100 justify-center items-center">
          <table className="table w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="pl-12">Crop</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCrops.map((crop) => (
                <tr
                  key={crop._id}
                  className="hover:bg-green-50 transition duration-200"
                >
                  <td>
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-25 h-18 rounded-lg object-cover"
                    />
                  </td>
                  <td>{crop.name}</td>
                  <td>{crop.type}</td>
                  <td>{crop.pricePerUnit || crop.price}</td>
                  <td>{crop.unit}</td>
                  <td>{crop.quantity}</td>
                  <td>{crop.location}</td>
                  <td className="flex gap-2 justify- items-center">
                    <button
                      onClick={() => {
                        setSelectedCrop(crop);
                        document.getElementById("editModal").showModal();
                      }}
                      className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(crop._id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✏️ Edit Modal */}
      <dialog id="editModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-2xl">
          <h3 className="font-bold text-lg text-green-700 mb-4">
            Edit Crop Info
          </h3>
          {selectedCrop && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="label font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedCrop.name}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label font-medium text-gray-700">
                  Price (৳)
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={selectedCrop.pricePerUnit || selectedCrop.price}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn bg-green-600 hover:bg-green-700 text-white w-full"
              >
                Update Crop
              </button>
            </form>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyPost;