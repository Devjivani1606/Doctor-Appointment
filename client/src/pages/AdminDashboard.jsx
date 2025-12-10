import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaHospital, FaMapMarkerAlt, FaRupeeSign, FaClock, FaGraduationCap, FaEye, FaUsers, FaPlus, FaTrash, FaPhone, FaEnvelope } from 'react-icons/fa';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchAllDoctors();
    }, []);

    const fetchAllDoctors = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/doctor/getAllDoctors');
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log('Error fetching doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    const viewDoctorDetails = (doctor) => {
        setSelectedDoctor(doctor);
        setShowModal(true);
    };

    const deleteDoctor = async (doctorId) => {
        if (window.confirm('Are you sure you want to delete this doctor? All data will be permanently removed.')) {
            try {
                const res = await axios.delete(`http://localhost:5000/api/v1/doctor/deleteDoctor/${doctorId}`);
                if (res.data.success) {
                    alert('Doctor deleted successfully!');
                    fetchAllDoctors();
                }
            } catch (error) {
                alert('Error deleting doctor: ' + (error.response?.data?.message || 'Something went wrong'));
            }
        }
    };

    const addNewDoctor = () => {
        navigate('/register', { state: { adminAdd: true } });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">Loading doctors data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                                <FaHospital className="mr-4 text-blue-600" />
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-600 text-lg">Manage all doctors and their profiles</p>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-4">
                            <div className="text-center bg-blue-50 p-4 rounded-xl">
                                <FaUsers className="text-3xl text-blue-600 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
                                <p className="text-sm text-gray-600">Total Doctors</p>
                            </div>
                            <button
                                onClick={addNewDoctor}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <FaPlus className="mr-2" />
                                Add New Doctor
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                    <div key={doctor._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                            <div className="flex items-center space-x-4">
                                {doctor.image ? (
                                    <img 
                                        src={doctor.image} 
                                        alt={doctor.name}
                                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-xl border-4 border-white shadow-lg">
                                        {doctor.name?.charAt(0) || 'D'}
                                    </div>
                                )}
                                <div className="text-white">
                                    <h3 className="text-xl font-bold">Dr. {doctor.name}</h3>
                                    <p className="text-blue-100">{doctor.specialization || 'General'}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center text-gray-600">
                                    <FaEnvelope className="mr-3 text-blue-500 w-4" />
                                    <span className="text-sm truncate">{doctor.email}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaPhone className="mr-3 text-green-500 w-4" />
                                    <span className="text-sm">{doctor.phone || 'Not provided'}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaMapMarkerAlt className="mr-3 text-red-500 w-4" />
                                    <span className="text-sm truncate">{doctor.location || 'Location not specified'}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaClock className="mr-3 text-orange-500 w-4" />
                                    <span className="text-sm">{doctor.experience || 0} years experience</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaRupeeSign className="mr-3 text-yellow-500 w-4" />
                                    <span className="text-sm">₹{doctor.fees || 'Not set'}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaGraduationCap className="mr-3 text-purple-500 w-4" />
                                    <span className="text-sm truncate">{doctor.qualifications || 'Not specified'}</span>
                                </div>
                            </div>
                            
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => viewDoctorDetails(doctor)}
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center text-sm"
                                >
                                    <FaEye className="mr-1" />
                                    View
                                </button>
                                <button
                                    onClick={() => deleteDoctor(doctor._id)}
                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center text-sm"
                                >
                                    <FaTrash className="mr-1" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Doctor Details Modal */}
            {showModal && selectedDoctor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    {selectedDoctor.image ? (
                                        <img 
                                            src={selectedDoctor.image} 
                                            alt={selectedDoctor.name}
                                            className="w-20 h-20 rounded-full object-cover border-4 border-white"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-2xl border-4 border-white">
                                            {selectedDoctor.name?.charAt(0) || 'D'}
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-2xl font-bold">Dr. {selectedDoctor.name}</h2>
                                        <p className="text-blue-100">{selectedDoctor.specialization}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-white hover:text-gray-200 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                        <p className="text-gray-900 font-medium">{selectedDoctor.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                                        <p className="text-gray-900 font-medium">{selectedDoctor.phone || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Experience</label>
                                        <p className="text-gray-900 font-medium">{selectedDoctor.experience || 0} years</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Consultation Fee</label>
                                        <p className="text-gray-900 font-medium">₹{selectedDoctor.fees || 'Not set'}</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Location</label>
                                        <p className="text-gray-900 font-medium">{selectedDoctor.location || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Qualifications</label>
                                        <p className="text-gray-900 font-medium">{selectedDoctor.qualifications || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Working Hours</label>
                                        <p className="text-gray-900 font-medium">
                                            {selectedDoctor.timings?.start || '09:00'} - {selectedDoctor.timings?.end || '17:00'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {selectedDoctor.about && (
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">About</label>
                                    <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedDoctor.about}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;