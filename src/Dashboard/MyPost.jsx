import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const [myCrops, setMyCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://cropzen.vercel.app/crops?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyCrops(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching crops:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-green-700 font-semibold text-lg animate-pulse">
          Loading your posts...
        </p>
      </div>
    );
  }

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
        fetch(`https://cropzen.vercel.app/crops/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMyCrops((prev) =>
                prev.filter((crop) => crop._id !== id)
              );
              Swal.fire("Deleted!", "Your crop has been removed.", "success");
            }
          });
      }
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedName = form.name.value;
    const updatedPrice = parseFloat(form.price.value);

    fetch(`https://cropzen.vercel.app/crops/${selectedCrop._id}`, {
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
        My Crop Posts
      </h2>

      {myCrops.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">
            You haven't added any crops yet.
          </p>
          <a
            href="/addcrops"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Add Your First Crop
          </a>
        </div>
      ) : (
        <>
          {/* ================= MOBILE VIEW ================= */}
          <div className="grid gap-6 md:hidden">
            {myCrops.map((crop) => (
              <div
                key={crop._id}
                className="bg-white rounded-2xl shadow-md border p-5 space-y-3"
              >
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-40 object-cover rounded-xl"
                />

                <h3 className="text-xl font-bold text-green-700">
                  {crop.name}
                </h3>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>Type: {crop.type}</p>
                  <p>Price: ৳{crop.pricePerUnit || crop.price}</p>
                  <p>Unit: {crop.unit}</p>
                  <p>Quantity: {crop.quantity}</p>
                  <p>Location: {crop.location}</p>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => {
                      setSelectedCrop(crop);
                      document.getElementById("editModal").showModal();
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(crop._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP VIEW ================= */}
          <div className="hidden md:block overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-100">
            <table className="table w-full text-center">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th>Crop</th>
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
                  <tr key={crop._id} className="hover:bg-green-50">
                    <td>
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-20 h-14 rounded-lg object-cover mx-auto"
                      />
                    </td>
                    <td>{crop.name}</td>
                    <td>{crop.type}</td>
                    <td>৳{crop.pricePerUnit || crop.price}</td>
                    <td>{crop.unit}</td>
                    <td>{crop.quantity}</td>
                    <td>{crop.location}</td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedCrop(crop);
                            document.getElementById("editModal").showModal();
                          }}
                          className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(crop._id)}
                          className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ================= EDIT MODAL ================= */}
      <dialog id="editModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-2xl">
          <h3 className="font-bold text-lg text-green-700 mb-4">
            Edit Crop Info
          </h3>

          {selectedCrop && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="label font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedCrop.name}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label font-medium">Price (৳)</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={
                    selectedCrop.pricePerUnit || selectedCrop.price
                  }
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