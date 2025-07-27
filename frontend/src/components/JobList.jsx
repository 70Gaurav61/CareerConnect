// src/components/JobList.jsx
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get("/api/v1/job/get", {
                    withCredentials: true, // for cookies/JWTs
                });
                setJobs(res.data.jobs);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-center">Available Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.length > 0 ? (
                    jobs.map((job) => <JobCard key={job._id} job={job} />)
                ) : (
                    <p className="col-span-full text-center text-gray-600">No jobs found.</p>
                )}
            </div>
        </div>
    );
};

export default JobList;
