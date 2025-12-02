import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyProfilePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userType = localStorage.getItem('userType');
            const endpoint = userType === 'doctor' 
                ? 'http://localhost:5000/api/v1/doctor/getDoctorInfo'
                : 'http://localhost:5000/api/v1/user/getUserData';
            
            const res = await axios.post(endpoint, {}, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            });
            if (res.data.success) {
                setUserData(res.data.data);
                setFormData(res.data.data);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdateProfile = async () => {
        try {
            const userType = localStorage.getItem('userType');
            const endpoint = userType === 'doctor' 
                ? 'http://localhost:5000/api/v1/doctor/updateProfile'
                : 'http://localhost:5000/api/v1/user/updateUserProfile';
            
            const res = await axios.post(endpoint, formData, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            });
            if (res.data.success) {
                alert('Profile updated successfully');
                setUserData(res.data.data);
                setIsEditing(false);
            }
        } catch (err) {
            console.log(err);
            alert('Error updating profile');
        }
    };

    const handleCancel = () => {
        setFormData(userData);
        setIsEditing(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-gray-600">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage your profile information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    {!isEditing ? (
                        // View Mode
                        <div>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between py-3 border-b">
                                    <span className="text-gray-600">Name:</span>
                                    <span className="font-medium">{userData?.name || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="font-medium">{userData?.email || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b">
                                    <span className="text-gray-600">Phone:</span>
                                    <span className="font-medium">{userData?.phone || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b">
                                    <span className="text-gray-600">Account Type:</span>
                                    <span className="font-medium">{userData?.isDoctor ? 'Doctor' : 'Patient'}</span>
                                </div>
                                
                                {/* Doctor specific fields */}
                                {userData?.isDoctor && (
                                    <>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Specialization:</span>
                                            <span className="font-medium">{userData?.specialization || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Experience:</span>
                                            <span className="font-medium">{userData?.experience || 'N/A'} years</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Consultation Fee:</span>
                                            <span className="font-medium">₹{userData?.fees || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Timings:</span>
                                            <span className="font-medium">
                                                {userData?.timings?.start || 'N/A'} - {userData?.timings?.end || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Location:</span>
                                            <span className="font-medium">{userData?.location || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b">
                                            <span className="text-gray-600">Qualifications:</span>
                                            <span className="font-medium">{userData?.qualifications || 'N/A'}</span>
                                        </div>
                                        {userData?.about && (
                                            <div className="py-3 border-b">
                                                <span className="text-gray-600 block mb-2">About:</span>
                                                <span className="font-medium">{userData.about}</span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            <button 
                                onClick={() => setIsEditing(true)}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        // Edit Mode
                        <div>
                            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone || ''}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Doctor specific fields */}
                                {userData?.isDoctor && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                            <input
                                                type="text"
                                                name="specialization"
                                                value={formData.specialization || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                                            <input
                                                type="number"
                                                name="experience"
                                                value={formData.experience || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹)</label>
                                            <input
                                                type="number"
                                                name="fees"
                                                value={formData.fees || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                                            <textarea
                                                name="about"
                                                value={formData.about || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows="3"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter your clinic/hospital location"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                                            <input
                                                type="text"
                                                name="qualifications"
                                                value={formData.qualifications || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter your qualifications (e.g., MBBS, MD)"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                                <input
                                                    type="time"
                                                    value={formData.timings?.start || ''}
                                                    onChange={(e) => setFormData({...formData, timings: {...formData.timings, start: e.target.value}})}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                                <input
                                                    type="time"
                                                    value={formData.timings?.end || ''}
                                                    onChange={(e) => setFormData({...formData, timings: {...formData.timings, end: e.target.value}})}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button 
                                    onClick={handleUpdateProfile}
                                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                                >
                                    Save Changes
                                </button>
                                <button 
                                    onClick={handleCancel}
                                    className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;