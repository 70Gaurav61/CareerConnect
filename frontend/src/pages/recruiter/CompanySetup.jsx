import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CompanySetup = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get company ID from URL

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = new FormData();
      for (const key in formData) {
        if (key === "logo") {
          form.append("file", formData.logo);
        } else {
          form.append(key, formData[key]);
        }
      }

      await axios.put(
        `http://localhost:3000/api/v1/company/update/${id}`,
        form,
        { withCredentials: true }
      );

      toast.success("Company updated successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Error updating company");
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-white">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm p-8 rounded-3xl shadow-xl"
    >
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors duration-200 mb-4"
      >
        <span className="text-xl">←</span> Back
      </button>

      <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Company Setup
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow duration-200 shadow-sm hover:shadow-md"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow duration-200 shadow-sm hover:shadow-md"
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow duration-200 shadow-sm hover:shadow-md"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow duration-200 shadow-sm hover:shadow-md"
        />
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleChange}
          className="border border-gray-300 px-4 py-3 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors duration-200
                     file:mr-4 file:border-0 file:bg-indigo-100 file:py-2 file:px-4 file:rounded-md file:text-indigo-700 file:cursor-pointer file:hover:bg-indigo-200"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`mt-6 w-full py-3 rounded-2xl font-semibold text-white text-lg ${
          submitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-600 to-indigo-800"
        }`}
      >
        {submitting ? "Updating..." : "Update"}
      </button>
    </form>
  </div>
);


};

export default CompanySetup;
