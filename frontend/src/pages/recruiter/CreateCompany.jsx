import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCompany = () => {
  const [Name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("careerConnectUser"));
      if (!user?._id) throw new Error("User not found");

      console.log("one");
      await axios.post("http://localhost:3000/api/v1/company/register", {
        companyName: Name,
        userId: user._id,
      },
      {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      // console.log("two");
      const companyId = res.data.company._id; 
      navigate("/recruiter/company-setup/${companyId}"); // Navigate to company setup with the new company ID
    } catch (error) {
      console.error("Company creation failed:", error.response?.data?.message || error.message);
      alert("Error creating company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-2">Your Company Name</h2>
        <p className="text-gray-500 mb-6">
          What would you like to give your company name? You can change this
          later.
        </p>

        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700"
        >
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 mb-4 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Microsoft"
          required
        />

        <div className="flex gap-4">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-black"
            onClick={() => navigate("/recruiter/companies")} // ✅ Cancel → /recruiter/companies
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Saving..." : "Continue"} 
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompany;
