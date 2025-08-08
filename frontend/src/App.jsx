
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home" // if you have one
import ViewProfile from "./pages/ViewProfile"
import UpdateProfile from "./pages/UpdateProfile"
import AppliedJobs from './pages/AppliedJobs';
import BrowseJobs from "./pages/BrowseJobs";
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/jobs" element={<AppliedJobs />} />
        <Route path="/browse" element={<BrowseJobs />} />
      </Routes>
    </Router>
  )
}

export default App
