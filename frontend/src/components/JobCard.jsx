import React from "react";
import { BriefcaseIcon, MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{job.company}</p>
        </div>
        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-lg">
          {job.type}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-gray-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="h-5 w-5 text-gray-400" />
          <span>{job.experience} experience</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
          <span>Posted on {job.postedDate}</span>
        </div>
      </div>

      <div className="mt-4">
        <button className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
