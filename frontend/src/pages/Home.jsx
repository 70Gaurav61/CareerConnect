<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; //  import context

function Home() {
  const { user } = useAuth(); //  get current logged-in user
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/jobs");
        setJobs(res.data.jobs || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load jobs.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="px-6 sm:px-10 lg:px-20 py-10 font-sans bg-gray-50 min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Career<span className="text-red-600">Connect</span>
        </h1>

        <div className="flex gap-6 items-center text-sm">
          <a href="#">Home</a>
          <a href="#">Jobs</a>
          <a href="#">Browse</a>
          {user ? (
            <>
              <span className="font-semibold">{user.name}</span>
              <img
                src={user.avatar || "/assets/avatar.png"} // fallback if no avatar
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            </>
          ) : (
            <a href="/login" className="text-purple-700 font-medium">
              Login
            </a>
          )}
        </div>
      </div>
=======
import React from "react";
import JobList from "../components/JobList";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Home = () => {
  const filterTags = [
    "Frontend Developer",
    "Backend Developer",
    "Data Engineer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Project Manager",
    "DevOps Engineer",
    "Mobile App Developer",
    "QA Engineer",
    "Cloud Architect"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
>>>>>>> feature

      {/* Hero Section */}
      <div className="bg-gray-50 py-16 text-center px-6 sm:px-10 lg:px-20">
        <p className="bg-red-100 text-red-600 px-4 py-1 inline-block rounded-full text-xs font-semibold">
          No. 1 Job Hunt Website
        </p>
        <h2 className="text-4xl font-bold mt-4 leading-tight">
          Search, Apply & <br /> Get Your <span className="text-purple-700">Dream Jobs</span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
<<<<<<< HEAD
          Welcome {user?.name || "Guest"}, find jobs that fit your skills and goals.
=======
          Find the best job opportunities tailored for you. Discover top companies and elevate your career.
>>>>>>> feature
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="px-6 py-3 w-80 rounded-l-full border focus:outline-none shadow-md"
          />
          <button className="bg-purple-700 px-6 py-3 text-white rounded-r-full shadow-md hover:cursor-pointer">
            🔍
          </button>
        </div>

        {/* Filter Tags */}
        <div className="mt-10 overflow-x-auto whitespace-nowrap px-4">
          <div className="inline-flex gap-4">
            {filterTags.map((role) => (
              <button
                key={role}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium shadow-sm whitespace-nowrap"
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job List Section */}
      <JobList />

      <Footer />
    </div>
  );
};

export default Home;
