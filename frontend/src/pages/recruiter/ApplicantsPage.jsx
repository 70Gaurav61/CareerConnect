// src/pages/recruiter/ApplicantsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../shared/Navbar";
import { toast } from "react-toastify";

const ApplicantsPage = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/application/${jobId}/applicants`,
        { withCredentials: true }
      );

      const applications = res.data.job?.applications || [];

      const formattedApplicants = applications.map((app) => ({
        _id: app._id,
        name: app.applicant?.fullname || "N/A",
        email: app.applicant?.email || "N/A",
        resume: app.applicant?.profile?.resume || null,
        status: app.status,
      }));

      setApplicants(formattedApplicants);
    } catch (err) {
      setError("Failed to load applicants");
      toast.error("Failed to load applicants");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/application/status/${applicationId}/update`,
        { status },
        { withCredentials: true }
      );

      setApplicants((prev) =>
        prev.map((a) =>
          a._id === applicationId ? { ...a, status } : a
        )
      );

      toast.success(
        status === "accepted"
          ? "Applicant accepted successfully"
          : "Applicant rejected"
      );
    } catch (err) {
      console.error("Error updating status", err);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

return (
  <div className="p-6 bg-gradient-to-br from-indigo-50 to-white min-h-screen transition-colors duration-500">
    <Navbar />

    <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
      Applicants
    </h2>

    {applicants.length > 0 ? (
      <div className="overflow-x-auto rounded-xl shadow-2xl shadow-indigo-200/50">
        <table className="w-full text-left border border-gray-200 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm">
          <thead className="bg-gradient-to-r from-purple-100 to-pink-100">
            <tr>
              <th className="py-3 px-5 text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-5 text-sm font-semibold text-gray-700">Email</th>
              <th className="py-3 px-5 text-sm font-semibold text-gray-700">Resume</th>
              <th className="py-3 px-5 text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app, idx) => (
              <tr
                key={app._id}
                className={`border-t transform transition duration-300 hover:scale-[1.02] hover:z-10 hover:shadow-lg hover:bg-indigo-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-3 px-5 text-gray-900">{app.name}</td>
                <td className="py-3 px-5 text-gray-900">{app.email}</td>
                <td className="py-3 px-5">
                  {app.resume ? (
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                      📄 View Resume
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">No Resume</span>
                  )}
                </td>
                <td className="py-3 px-5">
                  {app.status === "accepted" ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 animate-pulse">
                      Accepted
                    </span>
                  ) : app.status === "rejected" ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 animate-pulse">
                      Rejected
                    </span>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(app._id, "accepted")}
                        className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 hover:scale-110 active:scale-95 transition transform duration-200 text-white px-4 py-1.5 rounded-full shadow-md shadow-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus(app._id, "rejected")}
                        className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 hover:scale-110 active:scale-95 transition transform duration-200 text-white px-4 py-1.5 rounded-full shadow-md shadow-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-200"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-gray-600 italic mt-8 animate-pulse">
        No applicants yet — could be time to send out more job postings! 🚀
      </p>
    )}
  </div>
);

};

export default ApplicantsPage;
