import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../shared/Navbar";

const RecruiterCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("/company/get", { withCredentials: true });
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
    setFiltered(
      companies.filter((c) =>
        c.name.toLowerCase().includes(term)
      )
    );
  };

  return (
    <div className="p-8">
      <Navbar /><br/>
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
                  <td className="p-4 text-gray-500">...</td>
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
