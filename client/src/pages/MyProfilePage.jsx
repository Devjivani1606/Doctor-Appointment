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
                const userData = res.data.data;
                // Initialize availableSlots if not present
                if (userData.isDoctor && !userData.availableSlots) {
                    userData.availableSlots = [];
                }
                setUserData(userData);
                setFormData(userData);
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    image: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const userType = localStorage.getItem('userType');
            const endpoint = userType === 'doctor' 
                ? 'http://localhost:5000/api/v1/doctor/updateProfile'
                : 'http://localhost:5000/api/v1/user/updateUserProfile';
            
            console.log('Updating profile with data:', formData);
            const res = await axios.post(endpoint, formData, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            });
            if (res.data.success) {
                alert('Profile updated successfully');
                setUserData(res.data.data);
                setFormData(res.data.data);
                setIsEditing(false);
                // Refresh the page data
                await fetchUserData();
            }
        } catch (err) {
            console.log('Update error:', err);
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
                                        <div className="py-3 border-b">
                                            <span className="text-gray-600 block mb-2">Profile Photo:</span>
                                            {userData?.image ? (
                                                <img 
                                                    src={userData.image} 
                                                    alt="Doctor" 
                                                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-200"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl border-2 border-blue-200">
                                                    {userData?.name?.charAt(0) || 'D'}
                                                </div>
                                            )}
                                        </div>
                                        {userData?.availableSlots && userData.availableSlots.length > 0 && (
                                            <div className="py-3 border-b">
                                                <span className="text-gray-600 block mb-2">Available Time Slots:</span>
                                                <div className="space-y-2">
                                                    {userData.availableSlots.map((daySlot, index) => (
                                                        daySlot.timeSlots && daySlot.timeSlots.length > 0 && (
                                                            <div key={index} className="text-sm">
                                                                <span className="font-medium text-gray-700">{daySlot.day}:</span>
                                                                <span className="ml-2 text-gray-600">{daySlot.timeSlots.join(', ')}</span>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
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
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.length <= 10) {
                                                handleInputChange(e);
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (e.target.value && e.target.value.length !== 10) {
                                                alert('Phone number must be exactly 10 digits');
                                            }
                                        }}
                                        maxLength="10"
                                        pattern="[0-9]{10}"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter 10 digit phone number"
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

                                        
                                        {/* Available Time Slots */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
                                            <div className="space-y-4">
                                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                                                    const daySlots = formData.availableSlots?.find(slot => slot.day === day)?.timeSlots || [];
                                                    return (
                                                        <div key={day} className="border border-gray-200 rounded-lg p-4">
                                                            <h4 className="font-medium text-gray-700 mb-2">{day}</h4>
                                                            <div className="grid grid-cols-4 gap-2">
                                                                {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map((time) => (
                                                                    <label key={time} className="flex items-center space-x-2">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={daySlots.includes(time)}
                                                                            onChange={(e) => {
                                                                                const currentSlots = formData.availableSlots || [];
                                                                                const dayIndex = currentSlots.findIndex(slot => slot.day === day);
                                                                                let newSlots = [...currentSlots];
                                                                                
                                                                                if (dayIndex === -1) {
                                                                                    newSlots.push({ day, timeSlots: e.target.checked ? [time] : [] });
                                                                                } else {
                                                                                    const currentTimeSlots = newSlots[dayIndex].timeSlots;
                                                                                    if (e.target.checked) {
                                                                                        newSlots[dayIndex].timeSlots = [...currentTimeSlots, time];
                                                                                    } else {
                                                                                        newSlots[dayIndex].timeSlots = currentTimeSlots.filter(t => t !== time);
                                                                                    }
                                                                                }
                                                                                
                                                                                console.log('Updated slots:', newSlots);
                                                                                setFormData({...formData, availableSlots: newSlots});
                                                                            }}
                                                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                                        />
                                                                        <span className="text-sm">{time}</span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                                            <div className="flex items-center gap-4">
                                                {formData.image ? (
                                                    <img 
                                                        src={formData.image} 
                                                        alt="Preview" 
                                                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-blue-200">
                                                        {formData?.name?.charAt(0) || 'D'}
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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