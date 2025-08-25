import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../shared/Navbar";
import { toast } from "react-toastify"; // Import toast

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
        const res = await axios.get("http://localhost:3000/api/v1/job/getadminjobs", {
          withCredentials: true,
        });
        setJobs(res.data.jobs || []);
      } catch (err) {
        setError("Failed to fetch jobs.");
        toast.error("Failed to fetch jobs.");  // Show toast on error
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
      job.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (jobId) => {
    navigate(`/recruiter/edit-job/${jobId}`);
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/recruiter/applicants/${jobId}`);
  };

  return (
  <div className="p-6 bg-gradient-to-br from-indigo-50 to-white min-h-screen transition-colors duration-500">
    <Navbar />

    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <input
        type="text"
        placeholder="Filter by company name & role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-indigo-300
                   transition duration-200 shadow-sm"
      />
      <button
        onClick={() => navigate("/recruiter/post-job")}
        className="bg-gradient-to-r from-blue-600 to-purple-600
                   hover:from-blue-700 hover:to-purple-700
                   text-white px-4 py-2 rounded-lg shadow-lg
                   transform transition duration-200 hover:scale-105"
      >
        New Job
      </button>
    </div>

    {loading ? (
      <p className="text-gray-500 italic p-6 animate-pulse">Loading jobs...</p>
    ) : error ? (
      <p className="text-red-500 p-6">{error}</p>
    ) : (
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="w-full text-left divide-y divide-gray-200
                            bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm">
          <thead className="bg-gradient-to-r from-indigo-100 to-purple-100">
            <tr>
              <th className="py-3 px-5 text-sm font-semibold text-gray-700 uppercase">
                Company Name
              </th>
              <th className="py-3 px-5 text-sm font-semibold text-gray-700 uppercase">
                Role
              </th>
              <th className="py-3 px-5 text-sm font-semibold text-gray-700 uppercase">
                Date
              </th>
              <th className="py-3 px-5 text-sm font-semibold text-gray-700 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => (
                <tr
                  key={job._id}
                  className={`transition-transform duration-200 hover:scale-[1.02]
                              hover:z-10 hover:shadow-lg cursor-pointer ${
                                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }`}
                >
                  <td className="py-4 px-5 text-gray-800">
                    {job.company?.name || "N/A"}
                  </td>
                  <td className="py-4 px-5 text-gray-800">{job.title}</td>
                  <td className="py-4 px-5 text-gray-800">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-5">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() =>
                          setDropdownOpen(dropdownOpen === job._id ? null : job._id)
                        }
                        className="text-gray-500 hover:text-gray-700
                                   transition transform hover:scale-110"
                      >
                        ⋮
                      </button>
                      {dropdownOpen === job._id && (
                        <div className="absolute right-0 mt-2 w-36
                                        bg-white border border-gray-200
                                        rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => handleViewApplicants(job._id)}
                            className="w-full text-left px-4 py-2
                                       hover:bg-gray-100 transition duration-150"
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
                <td
                  colSpan="4"
                  className="py-6 text-center text-gray-500 italic animate-pulse"
                >
                  No jobs found — maybe time to post something new? 🚀
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}

    <p className="mt-4 text-gray-500 italic">
      A list of your recent posted jobs
    </p>
  </div>
);


};

export default RecruiterJobs;
