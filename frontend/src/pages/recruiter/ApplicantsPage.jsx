// src/pages/recruiter/ApplicantsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../shared/Navbar";

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

      const formattedApplicants = applications.map(app => ({
        _id: app._id,
        name: app.applicant?.fullname || "N/A",
        email: app.applicant?.email || "N/A",
        resume: app.applicant?.profile?.resume || null,
        status: app.status
      }));

      setApplicants(formattedApplicants);
    } catch (err) {
      setError("Failed to load applicants");
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

      // Update the specific applicant in state
      setApplicants(prev =>
        prev.map(a =>
          a._id === applicationId ? { ...a, status } : a
        )
      );
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <Navbar />
      <h2 className="text-xl font-bold mb-4">Applicants</h2>
      {applicants.length > 0 ? (
  <table className="w-full border-collapse text-left">
  <thead>
    <tr className="border-b">
      <th className="py-2 px-4 w-1/4">Name</th>
      <th className="py-2 px-4 w-1/4">Email</th>
      <th className="py-2 px-4 w-1/4">Resume</th>
      <th className="py-2 px-4 w-1/4">Action</th>
    </tr>
  </thead>
  <tbody>
    {applicants.map((app) => (
      <tr key={app._id} className="border-b">
        <td className="py-2 px-4">{app.name}</td>
        <td className="py-2 px-4">{app.email}</td>
        <td className="py-2 px-4">
          {app.resume ? (
            <a
              href={app.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Resume
            </a>
          ) : (
            "No Resume"
          )}
        </td>
        <td className="py-2 px-4">
          {app.status === "accepted" ? (
            <span className="text-green-600 font-semibold">Accepted</span>
          ) : app.status === "rejected" ? (
            <span className="text-red-600 font-semibold">Rejected</span>
          ) : (
            <>
              <button
                onClick={() => updateStatus(app._id, "accepted")}
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
              >
                Accept
              </button>
              <button
                onClick={() => updateStatus(app._id, "rejected")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>


      ) : (
        <p>No applicants yet.</p>
      )}
    </div>
  );
};

export default ApplicantsPage;
