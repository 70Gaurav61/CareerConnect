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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm mb-4 text-gray-500 hover:underline"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-semibold mb-6">Company Setup</h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            className="border px-4 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`mt-6 w-full py-3 rounded-2xl font-semibold text-white text-lg transition ${
            submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#101828] hover:bg-[#1f2a38]"
          }`}
        >
          {submitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default CompanySetup;
