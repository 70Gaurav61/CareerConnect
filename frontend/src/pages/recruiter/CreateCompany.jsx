import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null, // matches multer().single("file")
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] }); // image file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("careerConnectUser"));
      if (!user?._id) throw new Error("User not found");

      // Prepare multipart form data
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }
      form.append("userId", user._id); // required in backend

      const res = await axios.post("http://localhost:3000/api/v1/company/register", form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // const companyId = res.data.company._id;
      localStorage.setItem("companyId", res.data.company._id);
      navigate("/recruiter/post-job");
    } catch (error) {
      alert(`Company creation failed: ${error.response?.data?.message || "An error occurred"}`);
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-2">Register Company</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Company Name"
            required
            className="w-full border px-4 py-2 rounded-md"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website"
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="file"
            name="file" // must match multer().single("file")
            accept="image/*"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/recruiter/companies")}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-black"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompany;
