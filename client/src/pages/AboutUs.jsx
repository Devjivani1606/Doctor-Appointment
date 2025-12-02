import React from 'react';
import { FaHeart, FaHospital, FaClock, FaLock, FaUserMd, FaBullseye, FaEye, FaStar } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-300/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-purple-400/15 rounded-full blur-xl"></div>
                    <div className="absolute bottom-20 right-10 w-16 h-16 bg-pink-300/20 rounded-full blur-lg"></div>
                </div>
                <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                        <FaHeart className="text-red-300" />
                        <span className="text-sm">Trusted Healthcare Partner</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        HealthCare Pro
                    </h1>
                    <p className="text-lg opacity-90">
                        Making Healthcare Accessible for Everyone
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>50K+ Patients</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <span>1K+ Doctors</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <FaBullseye className="text-blue-600" /> Our Mission
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            We connect patients with healthcare professionals through our seamless platform, making medical appointments simple and accessible for everyone.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <FaEye className="text-indigo-600" /> Our Vision
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            To revolutionize healthcare access through technology, making quality medical care just a click away for patients worldwide.
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
                        <FaStar className="text-yellow-500" /> Why Choose Us?
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition-shadow">
                            <FaHospital className="text-3xl text-blue-600 mx-auto mb-3" />
                            <h3 className="text-sm font-bold mb-2">Easy Booking</h3>
                            <p className="text-xs text-gray-600">Quick appointments</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition-shadow">
                            <FaUserMd className="text-3xl text-green-600 mx-auto mb-3" />
                            <h3 className="text-sm font-bold mb-2">Expert Doctors</h3>
                            <p className="text-xs text-gray-600">Qualified professionals</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition-shadow">
                            <FaClock className="text-3xl text-orange-600 mx-auto mb-3" />
                            <h3 className="text-sm font-bold mb-2">24/7 Available</h3>
                            <p className="text-xs text-gray-600">Round the clock</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition-shadow">
                            <FaLock className="text-3xl text-red-600 mx-auto mb-3" />
                            <h3 className="text-sm font-bold mb-2">Secure</h3>
                            <p className="text-xs text-gray-600">Protected data</p>
                        </div>
                    </div>
                </div>

                {/* About Platform */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
                        About Our Platform
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                        <div>
                            <p className="mb-3">
                                <strong>Founded:</strong> HealthCare Pro was founded in 2024 to transform healthcare appointment booking and help thousands of patients connect with doctors efficiently.
                            </p>
                            <p>
                                <strong>Our Commitment:</strong> We provide excellent service, security, privacy, and continuous improvement based on user feedback.
                            </p>
                        </div>
                        <div>
                            <p className="mb-2"><strong>What We Offer:</strong></p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                                <li>Easy doctor search by specialization</li>
                                <li>Real-time appointment availability</li>
                                <li>Secure online booking system</li>
                                <li>Appointment reminders & notifications</li>
                                <li>Patient profile management</li>
                                <li>Doctor feedback & ratings</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-6 text-center">
                    <h2 className="text-xl font-bold mb-4">Get In Touch</h2>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <strong>Email:</strong><br/>
                            <a href="mailto:support@healthcare.com" className="hover:underline">support@healthcare.com</a>
                        </div>
                        <div>
                            <strong>Phone:</strong><br/>
                            <a href="tel:+919876543210" className="hover:underline">+91 9876 543 210</a>
                        </div>
                        <div>
                            <strong>Address:</strong><br/>
                            Healthcare Avenue, Medical City
                        </div>
                    </div>
                    <p className="text-sm opacity-90 mt-4">
                        Have questions? We're here to help!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;