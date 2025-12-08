import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock, FaUserMd, FaHospital, FaArrowRight } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [loginAsDoctor, setLoginAsDoctor] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const endpoint = loginAsDoctor 
                ? 'http://localhost:5000/api/v1/doctor/doctor-login'
                : 'http://localhost:5000/api/v1/user/login';
            const res = await axios.post(endpoint, formData);
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userType', loginAsDoctor ? 'doctor' : 'patient');
                alert('Login Successful! Welcome back!');
                navigate(loginAsDoctor ? '/doctor-dashboard' : '/');
            } else {
                alert('Login Failed: ' + res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert('Error: ' + (error.response?.data?.message || 'Something went wrong'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl mb-4 shadow-2xl transform hover:scale-105 transition-transform">
                        <FaHospital className="text-4xl text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to continue to your account</p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                id="loginAsDoctor"
                                type="checkbox"
                                checked={loginAsDoctor}
                                onChange={(e) => setLoginAsDoctor(e.target.checked)}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="loginAsDoctor" className="ml-3 flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                                <FaUserMd className="mr-2 text-blue-600" />
                                Login as Doctor
                            </label>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2" 
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : (
                                <>
                                    Sign In
                                    <FaArrowRight />
                                </>
                            )}
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-600 font-bold hover:text-blue-700 hover:underline">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
