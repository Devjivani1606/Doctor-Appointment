import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                        <span className="text-3xl">🏥</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Sign in to your account</p>
                </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                                <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                                <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* Login as Doctor Checkbox */}
                            <div className="flex items-center">
                                <input
                                    id="loginAsDoctor"
                                    type="checkbox"
                                    checked={loginAsDoctor}
                                    onChange={(e) => setLoginAsDoctor(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="loginAsDoctor" className="ml-2 block text-sm text-gray-700">
                                    Login as Doctor 👨‍⚕️
                                </label>
                            </div>
                            
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-600 font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
            </div>
        </div>
    );
};

export default Login;
