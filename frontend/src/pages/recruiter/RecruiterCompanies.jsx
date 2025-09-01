import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../shared/Navbar";

const RecruiterCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null); // store company id whose dropdown is open
  const navigate = useNavigate();
  const dropdownRefs = useRef({}); // store refs for each dropdown

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/company/get", {
          withCredentials: true,
        });
        setCompanies(res.data.companies || []);
        setFiltered(res.data.companies || []);
      } catch (err) {
        console.error("Error fetching companies", err);
      }
    };
    fetchCompanies();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFiltered(companies.filter((c) => c.name.toLowerCase().includes(term)));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        dropdownRefs.current[dropdownOpen] &&
        !dropdownRefs.current[dropdownOpen].contains(event.target)
      ) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("click", handleClickOutside); // changed to click
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  return (
  <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-100 to-purple-50 bg-fixed">
    <Navbar />

    <div className="mt-8 flex justify-between items-center mb-6">
      <div className="relative w-1/3">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m1.7-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Filter by name"
          className="w-full bg-white bg-opacity-70 backdrop-blur-sm pl-10 px-4 py-3
                     border border-transparent rounded-xl shadow-sm transition
                     focus:outline-none focus:ring-2 focus:ring-indigo-300
                     hover:shadow-md"
        />
      </div>

      <button
        onClick={() => navigate("/recruiter/company/register")}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500
                   text-white px-5 py-3 rounded-xl font-bold shadow-lg
                   transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <span className="text-xl">+</span> New Company
      </button>
    </div>

    <div className="overflow-x-auto bg-white bg-opacity-70 backdrop-blur-sm
                    rounded-3xl shadow-2xl">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <tr className="sticky top-0">
            <th className="p-4 uppercase text-xs tracking-wide">Logo</th>
            <th className="p-4 uppercase text-xs tracking-wide">Name</th>
            <th className="p-4 uppercase text-xs tracking-wide">Date</th>
            <th className="p-4 uppercase text-xs tracking-wide">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((company) => (
              <tr
                key={company._id}
                className="group odd:bg-white even:bg-gray-100 border-t
                           transform transition-all duration-150
                           hover:-translate-y-0.5 hover:shadow-md"
              >
                <td className="p-4">
                  <img
                    src={company.logo || "https://via.placeholder.com/40"}
                    alt="logo"
                    className="w-10 h-10 object-contain"
                  />
                </td>
                <td className="p-4 font-medium text-indigo-600
                               group-hover:text-indigo-800 transition-colors">
                  {company.name}
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(company.createdAt)
                    .toISOString()
                    .split("T")[0]}
                </td>
                <td
                  className="p-4 relative"
                  ref={(el) => (dropdownRefs.current[company._id] = el)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen(
                        dropdownOpen === company._id ? null : company._id
                      );
                    }}
                    className="text-gray-500 transition-colors duration-200
                               hover:text-gray-700 text-xl"
                    title="Options"
                  >
                    …
                  </button>

                  {dropdownOpen === company._id && (
                    <div className="absolute right-0 mt-2 w-40
                                    bg-white border border-gray-200 rounded-xl
                                    shadow-lg z-10 animate-fade-in">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(
                            `/recruiter/company-setup/${company._id}`
                          );
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700
                                   transition-colors duration-150 hover:bg-gray-100"
                      >
                        Update Company
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="p-4 text-center text-gray-500 italic"
              >
                A list of your recent registered companies
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);


};

export default RecruiterCompanies;
