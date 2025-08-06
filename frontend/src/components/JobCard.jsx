import React from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {job.company?.name || "Unknown Company"}
          </p>
        </div>
        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-lg">
          {job.jobType}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-gray-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="h-5 w-5 text-gray-400" />
          <span>{job.experienceLevel} years experience</span>
        </div>
        <div className="flex items-center gap-2">
          <CurrencyRupeeIcon className="h-5 w-5 text-gray-400" />
          <span>₹{job.salary} / month</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
          <span>Posted on {new Date(job.createdAt).toDateString()}</span>
        </div>
      </div>

      {job.requirements && job.requirements.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Requirements:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {job.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex gap-2">
        <button className="text-sm border border-primary bg-primary text-primary px-4 py-2 rounded-lg hover:bg-cyan-400 hover:cursor-pointer hover:text-white transition">
          View Details
        </button>
        <button className="text-sm border border-primary text-primary px-4 py-2 rounded-lg hover:bg-emerald-400 hover:cursor-pointer hover:text-white transition">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
