import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaUserMd, FaHospital, FaArrowRight, FaHeart } from 'react-icons/fa';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isDoctor: false,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/v1/user/register', formData);
            if (res.data.success) {
                alert('Registration Successful! You can now login with your credentials');
                navigate('/login');
            } else {
                alert('Registration Failed: ' + res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert('Error: ' + (error.response?.data?.message || 'Something went wrong'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Register Form (40%) */}
            <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mb-4 shadow-lg lg:hidden">
                            <FaHospital className="text-3xl text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-600">Fill in your details to get started</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
                                <div className="relative">
                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <input
                                    type="checkbox"
                                    id="isDoctor"
                                    checked={formData.isDoctor}
                                    onChange={(e) => 
                                        setFormData({ ...formData, isDoctor: e.target.checked })
                                    }
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label
                                    htmlFor="isDoctor"
                                    className="ml-3 flex items-center text-sm font-medium text-gray-700 cursor-pointer"
                                >
                                    <FaUserMd className="mr-2 text-blue-600" />
                                    Register as a Doctor
                                </label>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2" 
                                disabled={loading}
                            >
                                {loading ? 'Creating Account...' : (
                                    <>
                                        Create Account
                                        <FaArrowRight />
                                    </>
                                )}
                            </button>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Welcome Section (60%) */}
            <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-12 flex-col justify-center items-center text-white text-center">
                <div className="max-w-xl">
                    <FaHeart className="text-6xl mb-6 mx-auto" />
                    <h1 className="text-5xl font-bold mb-4">Join Us Today!</h1>
                    <p className="text-lg text-blue-100 leading-relaxed">Connecting patients with certified healthcare<br></br> providers for quality medical consultations</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
