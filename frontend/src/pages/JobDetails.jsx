import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const JobDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/job/get/${id}`, {
          withCredentials: true,
        });
        setJob(res.data.job);
        setApplied(
          res.data.job.applications?.some(
            (app) => app.applicant === res.data.userId
          )
        );
      } catch (err) {
        toast.error("Error fetching job");
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const applyHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/application/apply/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setApplied(true);
      }
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.data.message || "Error applying for job");
      console.error("Application failed:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center mt-10">Job not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{job.title || "N/A"}</h1>
        <p className="text-gray-600 mt-1">{job.description || "N/A"}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="h-5 w-5 text-gray-600" />
          <p><span className="font-semibold">Type:</span> {job.jobType || "N/A"}</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-gray-600" />
          <p><span className="font-semibold">Location:</span> {job.location || "N/A"}</p>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 text-gray-600" />
          <p><span className="font-semibold">Experience:</span> {job.experienceLevel == 0 ? "Fresher" : `${job.experienceLevel} years`} </p>
        </div>
        <div className="flex items-center gap-2">
          <CurrencyRupeeIcon className="h-5 w-5 text-gray-600" />
          <p><span className="font-semibold">Salary:</span> {job.salary == 0 ? "Unpaid" : `₹${job.salary}`}</p>
        </div>
        <div className="flex items-center gap-2">
          <p><span className="font-semibold">Position:</span> {job.position || "N/A"}</p>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-1">Requirements:</h2>
        <ul className="list-disc list-inside text-gray-700">
          {job.requirements?.length ? (
            job.requirements.map((req, idx) => <li key={idx}>{req}</li>)
          ) : (
            <li>N/A</li>
          )}
        </ul>
      </div>

      <button
        onClick={applyHandler}
        disabled={applied}
        className={`w-full py-2 rounded-md font-semibold ${
          applied
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {applied ? "Applied" : "Apply Now"}
      </button>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded shadow"
        >
        ← Back
      </button>

    </div>
  );
};

export default JobDetails;
