import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch full profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/profile", {
          withCredentials: true, // ensures cookie-based auth works
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-700 text-lg">Loading profile...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-600 text-lg">Failed to load user profile.</p>
        </div>
        <Footer />
      </>
    );
  }

const { fullname, email, role, phoneNumber, createdAt, profile } = user;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            User Profile
          </h1>
          {profile?.profilePhoto && (
            <div className="flex justify-center mb-6">
              <img
                src={profile.profilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          )}

          <div className="grid gap-6">
            <ProfileRow label="Full Name" value={fullname} />
            <ProfileRow label="Email" value={email} />
            <ProfileRow label="Role" value={role} />
            <ProfileRow label="Phone Number" value={phoneNumber} />
            <ProfileRow label="Bio" value={profile?.bio} />
            <ProfileRow label="Skills" value={profile?.skills?.join(", ")} />
            <ProfileRow label="Resume" value={
              profile?.resume ? (
                <a href={profile.resume} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                  {profile.resumeOriginalName || "View Resume"}
                </a>
              ) : "N/A"
            } />
            <ProfileRow
              label="Joined On"
              value={new Date(createdAt).toLocaleDateString()}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const ProfileRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <span className="font-semibold text-gray-700">{label}:</span>
    <span className="text-gray-900">{value || "N/A"}</span>
  </div>
);

export default ViewProfile;
