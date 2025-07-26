import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('student');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
      <header className="flex justify-between items-center p-6 px-12 shadow-sm">
        <h1 className="text-2xl font-bold">
          <span className="text-black">Job</span><span className="text-red-600">Hunt</span>
        </h1>
        <div className="flex gap-4">
          <Link to="/" className="text-gray-700 hover:text-black">Home</Link>
          <Link to="/jobs" className="text-gray-700 hover:text-black">Jobs</Link>
          <Link to="/browse" className="text-gray-700 hover:text-black">Browse</Link>
          <Link to="/login" className="px-4 py-1 border rounded hover:bg-gray-100">Login</Link>
          <Link to="/register" className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700">Signup</Link>
        </div>
      </header>

      <main className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-6">Login</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="patel@gmail.com"
                className="w-full border px-4 py-2 rounded outline-none focus:ring focus:ring-purple-200"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="password"
                className="w-full border px-4 py-2 rounded outline-none focus:ring focus:ring-purple-200"
              />
            </div>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                />
                Students
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={role === 'recruiter'}
                  onChange={() => setRole('recruiter')}
                />
                Recruiter
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
