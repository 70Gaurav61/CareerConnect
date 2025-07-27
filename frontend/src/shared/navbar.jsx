import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { USER_API_END_POINT } from '../utils/constant';
import { useAuth } from "../contexts/AuthContext";
import { toast } from 'sonner';

// Heroicons
import { ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { user, setUser } = useAuth();  // 👈 use context only
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/v1/user/logout`, { withCredentials: true });
            if (res.data.success) {
                setUser(null); // update context state
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='bg-white shadow'>
            <div className='flex items-center justify-between mx-auto max-w-7xl px-4 h-16'>
                <h1 className='text-2xl font-bold'>Career<span className='text-[#F83002]'>Connect</span></h1>

                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {user?.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login">
                                <button className='border px-4 py-1 rounded-md hover:bg-gray-100'>Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className='bg-[#6A38C2] text-white px-4 py-1 rounded-md hover:bg-[#5b30a6]'>Signup</button>
                            </Link>
                        </div>
                    ) : (
                        <div className="relative" ref={menuRef}>
                            <img
                                src={user?.profile?.profilePhoto}
                                alt="profile"
                                onClick={() => setOpen(prev => !prev)}
                                className="w-10 h-10 rounded-full cursor-pointer object-cover"
                            />
                            {open && (
                                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-md z-10 p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img src={user?.profile?.profilePhoto} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-gray-700 gap-2">
                                        {user?.role === 'student' && (
                                            <>
                                                <Link to="/profile" className="flex items-center gap-2 hover:text-[#6A38C2]">
                                                    <UserIcon className="w-5 h-5" />
                                                    View Profile
                                                </Link>
                                                <Link to="/update-profile" className="flex items-center gap-2 hover:text-[#6A38C2]">
                                                    <UserIcon className="w-5 h-5" />
                                                    Update Profile
                                                </Link>
                                            </>
                                        )}
                                        <button
                                            onClick={logoutHandler}
                                            className="flex items-center gap-2 hover:text-[#F83002] mt-2"
                                        >
                                            <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
