import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { email, password, role },
        { withCredentials: true }
      )
      if (data.success) {
        //console.log("Login successful")
        setUser(data.user);
        if (role === "recruiter") {
          navigate("/recruiter/companies")
        } else {
          navigate("/home")
        }
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to <span className="text-purple-700">CareerConnect</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="patel@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center text-sm">
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={() => setRole("student")}
              />
              <span className="ml-1">Student</span>
            </label>
            <label className="flex items-center text-sm">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={role === "recruiter"}
                onChange={() => setRole("recruiter")}
              />
              <span className="ml-1">Recruiter</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-700 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
