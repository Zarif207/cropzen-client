import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddCrops = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Page entry loading
  const [pageLoading, setPageLoading] = useState(true);

  // Form submit loading
  const [loading, setLoading] = useState(false);

  // Simulate page loading for smooth UI
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddCrop = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const type = form.type.value;
    const pricePerUnit = parseFloat(form.pricePerUnit.value);
    const unit = form.unit.value;
    const quantity = parseFloat(form.quantity.value);
    const description = form.description.value;
    const location = form.location.value;
    const image = form.image.value;

    const newCrop = {
      name,
      type,
      pricePerUnit,
      unit,
      quantity,
      description,
      location,
      image,
      owner: {
        ownerEmail: user?.email,
        ownerName: user?.displayName,
      },
    };

    fetch("https://cropzen.vercel.app/crops", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newCrop),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (data.insertedId) {
          Swal.fire({
            title: "Crop Added Successfully!",
            text: `${name} has been listed for sale.`,
            icon: "success",
            confirmButtonColor: "#16a34a",
          });
          navigate("/myPosts");
        }
      });
  };

  if (pageLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-green-700 font-semibold text-lg animate-pulse">
          Loading your Post Form
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Add New Crop
        </h2>

        <form
          onSubmit={handleAddCrop}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="form-control">
            <label className="label font-medium text-gray-700">Crop Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter crop name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium text-gray-700">Type</label>
            <select
              name="type"
              className="select select-bordered w-full"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Grain">Grain</option>
              <option value="Pulse">Pulse</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label font-medium text-gray-700">
              Price per Unit (৳)
            </label>
            <input
              type="number"
              name="pricePerUnit"
              placeholder="e.g. 55"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium text-gray-700">Unit</label>
            <select
              name="unit"
              className="select select-bordered w-full"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Unit
              </option>
              <option value="kg">kg</option>
              <option value="ton">ton</option>
              <option value="bag">bag</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label font-medium text-gray-700">
              Estimated Quantity
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="e.g. 400"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter crop location"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Enter image URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
              placeholder="Short details about the crop"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="btn bg-[#00ac41] text-white w-full mt-4"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Add Crop"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCrops;
