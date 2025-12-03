import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Guest');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <header className="bg-gradient-to-r from-blue-50 via-cyan-50 to-sky-100 shadow-md p-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate(userType === 'doctor' ? '/doctor-dashboard' : '/')}>DocApp</h1>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4">
                    {userType !== 'doctor' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/')}>Home</button>}
                    {userType !== 'doctor' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/all-doctors')}>All Doctors</button>}
                    <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/about')}>About Us</button>
                    {isLoggedIn && userType === 'patient' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/appointments')}>Appointments</button>}
                    {isLoggedIn && userType === 'doctor' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/doctor-dashboard')}>Dashboard</button>}
                    {isLoggedIn && userType === 'doctor' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/my-profile')}>My Profile</button>}
                </nav>
                
                {/* Desktop User Menu */}
                <div className="hidden md:flex items-center gap-6">
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
                
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
                    <nav className="flex flex-col space-y-3">
                        {userType !== 'doctor' && <button className="text-left text-gray-700 hover:text-blue-600 py-2" onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}>Home</button>}
                        {userType !== 'doctor' && <button className="text-left text-gray-700 hover:text-blue-600 py-2" onClick={() => { navigate('/all-doctors'); setIsMobileMenuOpen(false); }}>All Doctors</button>}
                        <button className="text-left text-gray-700 hover:text-blue-600 py-2" onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }}>About Us</button>
                        {isLoggedIn && userType === 'patient' && <button className="text-left text-gray-700 hover:text-blue-600 py-2" onClick={() => { navigate('/appointments'); setIsMobileMenuOpen(false); }}>Appointments</button>}
                        {isLoggedIn && userType === 'doctor' && <button className="text-left text-gray-700 hover:text-blue-600 py-2" onClick={() => { navigate('/doctor-dashboard'); setIsMobileMenuOpen(false); }}>Dashboard</button>}
                        {isLoggedIn && userType === 'doctor' && <button className="text-left text-gray-700 hover:text-blue-600 py-2" onClick={() => { navigate('/my-profile'); setIsMobileMenuOpen(false); }}>My Profile</button>}
                        
                        <hr className="my-2" />
                        
                        {isLoggedIn ? (
                            <>
                                {userType === 'patient' && (
                                    <button 
                                        onClick={() => { navigate('/my-profile'); setIsMobileMenuOpen(false); }}
                                        className="text-left text-blue-600 hover:text-blue-800 py-2"
                                    >
                                        👤 My Profile
                                    </button>
                                )}
                                <div className="text-left py-2 text-gray-700">{userType === 'doctor' ? `Dr. ${userName}` : userName}</div>
                                <button
                                    onClick={() => { localStorage.clear(); navigate('/login'); setIsMobileMenuOpen(false); }}
                                    className="text-left text-red-500 hover:text-red-700 py-2"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                                    className="text-left text-blue-600 hover:text-blue-800 py-2"
                                >
                                    Login
                                </button>
                                <button 
                                    onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}
                                    className="text-left bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;