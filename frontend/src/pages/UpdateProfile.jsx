import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    profilePhoto: null,
    resume: null,
    bio: "",
    skills: "",
  });
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/profile", {
          withCredentials: true,
        });
        const { fullname, phoneNumber, profile } = res.data.user;
        setFormData({
          fullname: fullname,
          phoneNumber: phoneNumber,
          profilePhoto: null,
          resume: null,
          bio: profile?.bio || "",
          skills: profile?.skills || "",
        });
        setPreviewImage(profile?.profilePhoto || null);
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === "profilePhoto") {
        setFormData({ ...formData, profilePhoto: files[0] });
        setPreviewImage(URL.createObjectURL(files[0]));
      } else {
        setFormData({ ...formData, resume: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("fullname", formData.fullname);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("bio", formData.bio);
      data.append("skills", formData.skills);
      if (formData.profilePhoto) data.append("profilePhoto", formData.profilePhoto);
      if (formData.resume) data.append("resume", formData.resume);

      await axios.put("http://localhost:3000/api/v1/user/update-profile", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-6"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Update Profile
          </h2>

          <div className="space-y-4">
            <Input label="Full Name" name="fullname" value={formData.fullname} onChange={handleChange} />
            <Input label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            <Input label="Bio" name="bio" value={formData.bio} onChange={handleChange} textarea />
            <Input label="Skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. React, Node.js, MongoDB" />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Profile Photo</label>
            <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} className="block w-full" />
            {previewImage && (
              <div className="mt-2">
                <img src={previewImage} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Resume</label>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} className="block w-full" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

const Input = ({ label, name, value, onChange, textarea = false, placeholder = "" }) => (
  <div>
    <label htmlFor={name} className="block font-semibold text-gray-700 mb-1">{label}</label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />
    )}
  </div>
);

export default UpdateProfile;
