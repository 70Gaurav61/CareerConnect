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
    <div className="p-8">
      <Navbar />
      <br />
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Filter by name"
          className="border px-4 py-2 rounded-md w-1/3"
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/recruiter/company/register")}
        >
          New Company
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">Logo</th>
              <th className="p-4">Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((company) => (
                <tr
                  key={company._id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="p-4">
                    <img
                      src={company.logo || "https://via.placeholder.com/40"}
                      alt="logo"
                      className="w-10 h-10 object-contain"
                    />
                  </td>
                  <td className="p-4 font-medium">{company.name}</td>
                  <td className="p-4">
                    {new Date(company.createdAt).toISOString().split("T")[0]}
                  </td>
                  <td
                    className="p-4 relative"
                    ref={(el) => (dropdownRefs.current[company._id] = el)}
                  >
                    {/* ... Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(
                          dropdownOpen === company._id ? null : company._id
                        );
                      }}
                      className="text-gray-500 hover:text-black text-xl"
                      title="Options"
                    >
                      ...
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen === company._id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-10">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(`/recruiter/company-setup/${company._id}`);
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
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
                <td colSpan="4" className="p-4 text-center text-gray-500">
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
