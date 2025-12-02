import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Guest');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.post('http://localhost:5000/api/v1/user/getUserData', {}, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                });
                if (res.data.success) {
                    setUserName(res.data.data.name || 'User');
                }
            } catch (err) {
                setUserName('Guest');
            }
        };
        fetchUser();
    }, []);

    const isLoggedIn = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    return (
        <header className="bg-gradient-to-r from-blue-50 via-cyan-50 to-sky-100 shadow-md p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate(userType === 'doctor' ? '/doctor-dashboard' : '/')}>DocApp</h1>
                    <nav className="flex items-center gap-4">
                        {userType !== 'doctor' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/')}>Home</button>}
                        {userType !== 'doctor' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/all-doctors')}>All Doctors</button>}
                        <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/about')}>About Us</button>
                        {isLoggedIn && userType === 'patient' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/appointments')}>Appointments</button>}
                        {isLoggedIn && userType === 'doctor' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/doctor-dashboard')}>Dashboard</button>}
                        {isLoggedIn && userType === 'doctor' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/my-profile')}>My Profile</button>}

                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    {isLoggedIn ? (
                        <>
                            {userType === 'patient' && (
                                <button 
                                    onClick={() => navigate('/my-profile')}
                                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                >
                                    👤 My Profile
                                </button>
                            )}
                            <span className="font-medium text-gray-700">{userType === 'doctor' ? `Dr. ${userName}` : userName}</span>
                            <button
                                onClick={() => { localStorage.clear(); navigate('/login'); }}
                                className="text-red-500 hover:text-red-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                onClick={() => navigate('/login')}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => navigate('/register')}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </header>
    );
};

export default Header;
