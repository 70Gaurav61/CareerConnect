import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Recruiter Pages
import CompanySetup from "./pages/recruiter/CompanySetup";
import CreateCompany from "./pages/recruiter/CreateCompany";
import RecruiterCompanies from "./pages/recruiter/RecruiterCompanies";
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import PostJob from "./pages/recruiter/PostJob";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public/User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Recruiter Routes */}
        <Route path="/recruiter/company-setup/:id" element={<CompanySetup />} />
        <Route path="/recruiter/company/register" element={<CreateCompany />} />
        <Route path="/recruiter/companies" element={<RecruiterCompanies />} />
        <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
        <Route path="/recruiter/post-job" element={<PostJob />} />
      </Routes>
    </Router>
  );
}

export default App;
  
