import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddCrops = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddCrop = (e) => {
    e.preventDefault();

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

    fetch("http://localhost:3000/crops", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newCrop),
    })
      .then((res) => res.json())
      .then((data) => {
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

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Add New Crop
        </h2>
        <form onSubmit={handleAddCrop} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Crop Name */}
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

          {/* Type */}
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

          {/* Price per unit */}
          <div className="form-control">
            <label className="label font-medium text-gray-700">Price per Unit (৳)</label>
            <input
              type="number"
              name="pricePerUnit"
              placeholder="e.g. 55"
              className="input input-bordered w-full"
              required
            />
          </div>

         {/* Unit */}
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

          {/* Quantity */}
          <div className="form-control">
            <label className="label font-medium text-gray-700">Estimated Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="e.g. 400"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Location */}
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

          {/* Image URL */}
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

          {/* Description */}
          <div className="form-control md:col-span-2">
            <label className="label font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
              placeholder="Short details about the crop"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="btn bg-[#00ac41] text-white w-full hover:from-green-700 hover:to-lime-600 mt-4"
            >
              Add Crop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCrops;