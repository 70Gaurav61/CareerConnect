import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/application/get", {
          withCredentials: true,
        });
        setApplications(res.data.application); // ✅ use correct key
      } catch (err) {
        console.error("Failed to fetch applied jobs", err);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Your Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">You haven’t applied for any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="border p-4 rounded-md bg-white shadow-sm"
            >
              <h3 className="text-lg font-medium">{app.job.title}</h3>
              <p className="text-sm text-gray-500">{app.job.company?.name}</p>
              <p className="mt-2 text-sm">
                Status:{" "}
                <span
                  className={`font-medium ${
                    app.status === "accepted"
                      ? "text-green-600"
                      : app.status === "rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {app.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default AppliedJobs;
