import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PostJob = () => {
  // const { id: companyId } = useParams(); // companyId from URL
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("careerConnectUser"));
      if (!user?._id) throw new Error("User not found");

      // Prepare job payload
      const jobData = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        salary: Number(formData.salary),
        location: formData.location,
        jobType: formData.jobType,
        experience: Number(formData.experienceLevel), 
        position: Number(formData.position),
        companyId: companyId, 
      };


      const res = await axios.post("http://localhost:3000/api/v1/job/post", jobData, {
        withCredentials: true,
      });

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

        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="number"
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          placeholder="Experience Level (in years)"
          required
          className="w-full px-4 py-2 border rounded"
        />

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

        <input
          type="number"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Number of Positions"
          required
          className="w-full px-4 py-2 border rounded"
        />

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
