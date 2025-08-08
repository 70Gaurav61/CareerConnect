import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../shared/Navbar";

const RecruiterJobs = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("careerConnectToken");
        const res = await axios.get("http://localhost:3000/api/v1/job/getadminjobs", {
          withCredentials: true,
        });
        setJobs(res.data.jobs || []);
      } catch (err) {
        setError("Failed to fetch jobs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      {
        return job.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
        job.title?.toLowerCase().includes(search.toLowerCase())
      
      }
    );
  // console.log("Filtered Jobs:", filteredJobs);
  
  const handleEdit = (jobId) => {
    navigate(`/recruiter/edit-job/${jobId}`);
  };

  const handleViewApplicants = (jobId) => {
    navigate("/");
  };

  return (
    <div className="p-6">
      <Navbar />
      <br />
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Filter by company name & role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 border border-gray-300 rounded px-4 py-2"
        />
        <button
          onClick={() => navigate("/recruiter/post-job")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          New Jobs
        </button>
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-2">Company Name</th>
              <th className="pb-2">Role</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job._id} className="border-b relative">
                  <td className="py-3">{job.company?.name || "N/A"}</td>
                  <td className="py-3">
                    {job.title}
                  </td>
                  <td className="py-3">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() =>
                          setDropdownOpen(dropdownOpen === job._id ? null : job._id)
                        }
                        className="text-xl px-2 cursor-pointer"
                      >
                        ⋮
                      </button>

                      {dropdownOpen === job._id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow z-10">
                          {/* <button
                            onClick={() => handleEdit(job._id)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                             Edit
                          </button> */}
                          <button
                            onClick={() => handleViewApplicants(job._id)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Applicants
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <p className="mt-4 text-gray-500">A list of your recent posted jobs</p>
    </div>
  );
};

export default RecruiterJobs;
