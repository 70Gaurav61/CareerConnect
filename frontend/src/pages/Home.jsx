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

      {/* Hero Section */}
      <div className="text-center mt-8">
        <p className="bg-red-100 text-red-600 px-4 py-1 inline-block rounded-full text-xs font-semibold">
          No. 1 Job Hunt Website
        </p>
        <h2 className="text-4xl font-bold mt-4 leading-tight">
          Search, Apply & <br /> Get Your <span className="text-purple-700">Dream Jobs</span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Welcome {user?.name || "Guest"}, find jobs that fit your skills and goals.
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="px-6 py-3 w-80 rounded-l-full border focus:outline-none shadow-md"
          />
          <button className="bg-purple-700 px-6 py-3 text-white rounded-r-full shadow-md">
            🔍
          </button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex justify-center gap-4 mt-10 flex-wrap">
        {["Frontend Developer", "Backend Developer", "Data Engineer"].map((role) => (
          <button
            key={role}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium shadow-sm"
          >
            {role}
          </button>
        ))}
      </div>

      {/* Job Listings */}
      <div className="mt-16">
        <h3 className="text-xl font-bold mb-6">
          <span className="text-purple-700">Latest and Top</span> Job Openings
        </h3>

        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="border rounded-xl p-4 shadow hover:shadow-md transition bg-white"
              >
                <h4 className="text-lg font-semibold text-gray-800">{job.title}</h4>
                <p className="text-sm text-gray-500">{job.company}</p>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{job.description}</p>
                <div className="mt-4 text-sm text-purple-700">{job.location}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
