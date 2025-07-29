import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center px-6 sm:px-10 lg:px-20 py-6 shadow-md">
      <Link to="/" className="text-2xl font-bold">
        Career<span className="text-red-600">Connect</span>
      </Link>

      <div className="flex gap-6 items-center text-sm">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/browse">Browse</Link>

        {user ? (
          <img
            src={user.profile || "/assets/avatar.png"}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <Link to="/login" className="bg-purple-600 text-white px-4 py-2 rounded-full">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
