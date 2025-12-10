import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Guest');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
        <header className="bg-white shadow-md p-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate(userType === 'doctor' ? '/doctor-dashboard' : userType === 'admin' ? '/admin-dashboard' : '/')}>DocApp+</h1>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4">
                    {userType !== 'doctor' && userType !== 'admin' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/')}>Home</button>}
                    {userType !== 'doctor' && userType !== 'admin' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/all-doctors')}>All Doctors</button>}
                    {isLoggedIn && userType === 'patient' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/appointments')}>Appointments</button>}
                    {isLoggedIn && userType === 'patient' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/patient-feedback')}>Feedback</button>}
                    {userType !== 'doctor' && userType !== 'admin' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/about')}>About Us</button>}
                    {isLoggedIn && userType === 'doctor' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/doctor-dashboard')}>Dashboard</button>}
                    {isLoggedIn && userType === 'doctor' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/my-profile')}>My Profile</button>}
                    {isLoggedIn && userType === 'doctor' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/about')}>About Us</button>}
                    {isLoggedIn && userType === 'admin' && <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/admin-dashboard')}>Admin Panel</button>}
                </nav>
                
                {/* Desktop User Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium"
                            >
                                <span>{userType === 'doctor' ? `Dr. ${userName}` : userName}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isUserMenuOpen && (
                                <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                                    <div className="p-2">
                                        <div className="px-4 py-3 bg-blue-50 rounded-lg mb-2">
                                            <p className="font-medium text-gray-900">{userType === 'doctor' ? `Dr. ${userName}` : userName}</p>
                                        </div>
                                        {userType === 'patient' && (
                                            <button
                                                onClick={() => { navigate('/my-profile'); setIsUserMenuOpen(false); }}
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-all"
                                            >
                                                My Profile
                                            </button>
                                        )}
                                        <button
                                            onClick={() => { localStorage.clear(); navigate('/login'); setIsUserMenuOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
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
                    className="md:hidden text-gray-700 hover:text-blue-600 p-2 rounded-xl hover:bg-blue-50 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>
            
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border border-blue-100 p-6 backdrop-blur-sm">
                    <nav className="flex flex-col space-y-1">
                        {userType !== 'doctor' && userType !== 'admin' && (
                            <button 
                                className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all duration-200 font-medium" 
                                onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
                            >
                                Home
                            </button>
                        )}
                        {userType !== 'doctor' && userType !== 'admin' && (
                            <button 
                                className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all duration-200 font-medium" 
                                onClick={() => { navigate('/all-doctors'); setIsMobileMenuOpen(false); }}
                            >
                                All Doctors
                            </button>
                        )}
                        {isLoggedIn && userType === 'patient' && (
                            <button 
                                className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all duration-200 font-medium" 
                                onClick={() => { navigate('/appointments'); setIsMobileMenuOpen(false); }}
                            >
                                Appointments
                            </button>
                        )}
                        {isLoggedIn && userType === 'patient' && (
                            <button 
                                className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all duration-200 font-medium" 
                                onClick={() => { navigate('/patient-feedback'); setIsMobileMenuOpen(false); }}
                            >
                                Feedback
                            </button>
                        )}
                        <button 
                            className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all duration-200 font-medium" 
                            onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }}
                        >
                            About Us
                        </button>
                        {isLoggedIn && userType === 'doctor' && (
                            <button 
                                className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all duration-200 font-medium" 
                                onClick={() => { navigate('/doctor-dashboard'); setIsMobileMenuOpen(false); }}
                            >
                                Dashboard
                            </button>
                        )}
                        {isLoggedIn && userType === 'doctor' && (
                            <button 
                                className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all duration-200 font-medium" 
                                onClick={() => { navigate('/my-profile'); setIsMobileMenuOpen(false); }}
                            >
                                My Profile
                            </button>
                        )}
                        
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-3"></div>
                        
                        {isLoggedIn ? (
                            <>
                                {userType === 'patient' && (
                                    <button 
                                        onClick={() => { navigate('/my-profile'); setIsMobileMenuOpen(false); }}
                                        className="text-left text-blue-600 hover:text-blue-800 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all duration-200 font-medium"
                                    >
                                        My Profile
                                    </button>
                                )}
                                <div className="text-left py-3 px-4 text-gray-700 bg-blue-50 rounded-xl font-medium">
                                    {userType === 'doctor' ? `Dr. ${userName}` : userName}
                                </div>
                                <button
                                    onClick={() => { localStorage.clear(); navigate('/login'); setIsMobileMenuOpen(false); }}
                                    className="text-left text-red-500 hover:text-red-700 hover:bg-red-50 py-3 px-4 rounded-xl transition-all duration-200 font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                                    className="text-left text-blue-600 hover:text-blue-800 hover:bg-blue-50 py-3 px-4 rounded-xl transition-all duration-200 font-medium"
                                >
                                    Login
                                </button>
                                <button 
                                    onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}
                                    className="text-left bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg"
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