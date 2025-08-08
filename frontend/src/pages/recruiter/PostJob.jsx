import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostJob = () => {
  const companyId = localStorage.getItem("companyId");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    position: "",
  });

  const [errors, setErrors] = useState({
    salary: "",
    experienceLevel: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation rules
    if (name === "salary" || name === "experienceLevel") {
      if (value !== "" && Number(value) < 0) {
        setErrors((prev) => ({ ...prev, [name]: "Cannot be negative" }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }

    if (name === "position") {
      if (value !== "" && Number(value) <= 0) {
        setErrors((prev) => ({
          ...prev,
          position: "Must be greater than 0",
        }));
      } else {
        setErrors((prev) => ({ ...prev, position: "" }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Block submission if there are any errors
    if (Object.values(errors).some((err) => err)) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("careerConnectUser"));
      if (!user?._id) throw new Error("User not found");

      // Ensure default values to pass backend validation
      const jobData = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        salary: formData.salary === "" ? 0 : Number(formData.salary),
        location: formData.location,
        jobType: formData.jobType,
        experience: formData.experienceLevel === "" ? 0 : Number(formData.experienceLevel),
        position: formData.position === "" ? 1 : Number(formData.position),
        companyId: companyId,
      };

      const res = await axios.post(
        "http://localhost:3000/api/v1/job/post",
        jobData,
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert("Job posted successfully!");
        navigate("/recruiter/jobs");
      }
    } catch (err) {
      console.error("Failed to post job:", err);
      alert(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
          className="w-full px-4 py-2 border rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          rows="4"
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="text"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Requirements (comma separated)"
          className="w-full px-4 py-2 border rounded"
        />

        <div>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            min="0"
            className="w-full px-4 py-2 border rounded"
          />
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            placeholder="Experience Level (in years)"
            min="0"
            className="w-full px-4 py-2 border rounded"
          />
          {errors.experienceLevel && (
            <p className="text-red-500 text-sm">{errors.experienceLevel}</p>
          )}
        </div>

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full px-4 py-2 border rounded"
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded bg-white"
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <div>
          <input
            type="number"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Number of Positions"
            min="1"
            className="w-full px-4 py-2 border rounded"
          />
          {errors.position && (
            <p className="text-red-500 text-sm">{errors.position}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
