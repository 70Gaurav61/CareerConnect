import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: [],
    type: [],
    salaryRange: [],
  });

  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/job/get", {
        withCredentials: true,
      });
      
      let fetchedJobs = res.data.jobs;

      if(searchQuery){
        fetchedJobs = fetchedJobs.filter(job => 
          job.title.toLowerCase().includes(searchQuery)
        );
      }
      setJobs(fetchedJobs);
      setAllJobs(fetchedJobs);
    } catch (error) {
      toast.error(error.data.message || "Server Error");
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const currentValues = prev[category];
      const isSelected = currentValues.includes(value);

      const updatedCategory = isSelected
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      const newFilters = {
        ...prev,
        [category]: updatedCategory,
      };

      filterJobs(newFilters);
      return newFilters;
    });
  };

  const filterJobs = (appliedFilters) => {
    let filtered = allJobs;

    // Filter by location
    if (appliedFilters.location.length > 0) {
      filtered = filtered.filter((job) =>
        appliedFilters.location.includes(job.location)
      );
    }

    // Filter by type
    if (appliedFilters.type.length > 0) {
      filtered = filtered.filter((job) =>
        appliedFilters.type.includes(job.jobType)
      );
    }

// Filter by salary range (monthly)
    if (appliedFilters.salaryRange.length > 0) {
        filtered = filtered.filter((job) => {
            return appliedFilters.salaryRange.some((range) => {
            if (range === "0-40k") return job.salary <= 40000;
            if (range === "40k-80k") return job.salary > 40000 && job.salary <= 80000;
            if (range === "80k+") return job.salary > 80000;
            return true;
            });
        });
    }

    setJobs(filtered);
  };

  const locations = ["Bangalore", "Mumbai", "Delhi", "Remote"];
  const jobTypes = ["Internship", "Full Time", "Remote"];
  const salaryRanges = [
    { label: "0 - ₹40k", value: "0-40k" },
    { label: "₹40k - ₹80k", value: "40k-80k" },
    { label: "₹80k+", value: "80k+" },
  ];


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Filters */}
      <aside className="w-1/4 bg-white p-6 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Location Filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Location</h3>
          {locations.map((loc) => (
            <div key={loc} className="flex items-center mb-1">
              <input
                type="checkbox"
                id={loc}
                checked={filters.location.includes(loc)}
                onChange={() => handleFilterChange("location", loc)}
                className="mr-2"
              />
              <label htmlFor={loc}>{loc}</label>
            </div>
          ))}
        </div>

        {/* Job Type Filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Job Type</h3>
          {jobTypes.map((type) => (
            <div key={type} className="flex items-center mb-1">
              <input
                type="checkbox"
                id={type}
                checked={filters.type.includes(type)}
                onChange={() => handleFilterChange("type", type)}
                className="mr-2"
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>

        {/* Salary Filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Salary Range</h3>
          {salaryRanges.map((range) => (
            <div key={range.value} className="flex items-center mb-1">
              <input
                type="checkbox"
                id={range.value}
                checked={filters.salaryRange.includes(range.value)}
                onChange={() => handleFilterChange("salaryRange", range.value)}
                className="mr-2"
              />
              <label htmlFor={range.value}>{range.label}</label>
            </div>
          ))}
        </div>
      </aside>

      {/* Job Cards */}
      <main className="w-3/4 p-6">
        <h2 className="text-2xl font-bold mb-4">Browse Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No jobs match your filters.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default BrowseJobs;
