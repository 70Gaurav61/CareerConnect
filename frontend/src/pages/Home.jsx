import { useState } from "react"

function Home() {
  return (
    <div className="px-6 sm:px-10 lg:px-20 py-10 font-sans">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Career<span className="text-red-600">Connect</span>
        </h1>
        <div className="flex gap-6 items-center text-sm">
          <a href="#">Home</a>
          <a href="#">Jobs</a>
          <a href="#">Browse</a>
          <img src="/assets/avatar.png" alt="profile" className="w-8 h-8 rounded-full" />
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
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Possimus adipisci cupiditate cum.
          <br />
          Lorem ipsum dolor sit amet consectetur adipiscing elit.
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

      {/* Job Listings Section */}
      <div className="mt-16">
        <h3 className="text-xl font-bold mb-6">
          <span className="text-purple-700">Latest and Top</span> Job Openings
        </h3>
        {/* Add job cards here */}
      </div>
    </div>
  )
}

export default Home
