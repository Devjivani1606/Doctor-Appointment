import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserMd, FaHospital, FaMapMarkerAlt, FaGraduationCap, FaClock, FaRupeeSign, FaFileAlt } from 'react-icons/fa';
import Notification from '../components/Notification';

const DoctorOnboarding = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        specialization: '',
        experience: '',
        fees: '',
        location: '',
        qualifications: '',
        about: '',
        timings: { start: '09:00', end: '17:00' }
    });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '', isVisible: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'start' || name === 'end') {
            setFormData({
                ...formData,
                timings: { ...formData.timings, [name]: value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/v1/doctor/updateProfile', formData, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            });
            if (res.data.success) {
                setNotification({ message: 'Profile setup completed successfully!', type: 'success', isVisible: true });
                setTimeout(() => navigate('/doctor-dashboard'), 1500);
            }
        } catch (error) {
            setNotification({ message: 'Error: ' + (error.response?.data?.message || 'Something went wrong'), type: 'error', isVisible: true });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Notification 
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={() => setNotification({ ...notification, isVisible: false })}
            />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <FaHospital className="text-5xl text-blue-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
                    <p className="text-gray-600">Help patients find you by completing your professional details</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <FaUserMd className="mr-2 text-blue-600" />
                                    Specialization *
                                </label>
                                <select
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Specialization</option>
                                    <option value="Cardiologist">Cardiologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatrician">Pediatrician</option>
                                    <option value="Orthopedist">Orthopedist</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="General Physician">General Physician</option>
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <FaClock className="mr-2 text-blue-600" />
                                    Experience (Years) *
                                </label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    min="0"
                                    max="50"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., 5"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <FaRupeeSign className="mr-2 text-blue-600" />
                                    Consultation Fee (₹) *
                                </label>
                                <input
                                    type="number"
                                    name="fees"
                                    value={formData.fees}
                                    onChange={handleChange}
                                    min="100"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., 500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <FaMapMarkerAlt className="mr-2 text-blue-600" />
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Mumbai, Maharashtra"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <FaGraduationCap className="mr-2 text-blue-600" />
                                Qualifications *
                            </label>
                            <input
                                type="text"
                                name="qualifications"
                                value={formData.qualifications}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., MBBS, MD (Cardiology)"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                                <input
                                    type="time"
                                    name="start"
                                    value={formData.timings.start}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                                <input
                                    type="time"
                                    name="end"
                                    value={formData.timings.end}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <FaFileAlt className="mr-2 text-blue-600" />
                                About Yourself
                            </label>
                            <textarea
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Tell patients about your expertise and approach to healthcare..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {loading ? 'Setting up your profile...' : 'Complete Setup & Continue'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default DoctorOnboarding;