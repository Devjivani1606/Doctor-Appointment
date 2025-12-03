import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DoctorDetailPage = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctorDetails();
        window.scrollTo(0, 0);
    }, [doctorId]);

    const fetchDoctorDetails = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/doctor/getDoctorById', 
                { doctorId },
                {
                    headers: localStorage.getItem('token') 
                        ? { Authorization: 'Bearer ' + localStorage.getItem('token') }
                        : {}
                }
            );
            if (res.data.success) {
                setDoctor(res.data.data);
            }
            setLoading(false);
        } catch (error) {
            console.log('Error fetching doctor details', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                    </div>
                    <p className="text-gray-600">Loading doctor details...</p>
                </div>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-gray-600 text-lg mb-4">❌ Doctor not found</p>
                    <button 
                        onClick={() => navigate('/all-doctors')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to Doctors
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/all-doctors')}
                    className="mb-6 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                >
                    ← Back to Doctors
                </button>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header Background */}
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                    {/* Content */}
                    <div className="px-8 pb-8">
                        {/* Doctor Info - Overlapping Avatar */}
                        <div className="flex flex-col md:flex-row gap-8 -mt-16 mb-8">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                {doctor.image ? (
                                    <img 
                                        src={doctor.image} 
                                        alt={`Dr. ${doctor.name}`} 
                                        className="w-40 h-40 rounded-full bg-white shadow-2xl border-4 border-blue-600 object-cover"
                                    />
                                ) : (
                                    <div className="w-40 h-40 rounded-full bg-white shadow-2xl border-4 border-blue-600 flex items-center justify-center text-6xl font-bold text-blue-600">
                                        {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                    </div>
                                )}
                            </div>

                            {/* Basic Info */}
                            <div className="flex-1 mt-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dr. {doctor.name}</h1>
                                <p className="text-lg text-blue-600 font-semibold mb-4">{doctor.specialization}</p>
                                
                                {/* Rating and Reviews */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">⭐</span>
                                        <span className="text-lg font-semibold text-gray-900">4.5/5</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">💬</span>
                                        <span className="text-lg text-gray-600">250+ reviews</span>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-xs text-gray-600">Experience</p>
                                        <p className="text-lg font-bold text-blue-600">{doctor.experience || 10} yrs</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-xs text-gray-600">Consultation Fee</p>
                                        <p className="text-lg font-bold text-green-600">₹{doctor.fees || doctor.feesPerConsultation || 500}</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <p className="text-xs text-gray-600">Patients</p>
                                        <p className="text-lg font-bold text-purple-600">2,000+</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t-2 border-gray-200 my-8"></div>

                        {/* Contact & Location Section */}
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-3">📧 Contact Information</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                        <p className="text-gray-600">
                                            <strong>Email:</strong> {doctor.email || 'Not provided'}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Phone:</strong> {doctor.phone || '+91 XXXX XXXX XX'}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-3">📍 Location</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-600">{doctor.location || 'Location not specified'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-3">⏰ Availability</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                        <p className="text-gray-600">
                                            <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Sunday:</strong> By appointment only
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-3">🎓 Qualifications</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-600">
                                            {doctor.qualifications || `MD, ${doctor.specialization || 'Healthcare'}`}
                                        </p>
                                        <p className="text-gray-600 text-sm mt-2">
                                            Specialization: {doctor.specialization}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="mb-8">
                            <h3 className="text-base font-bold text-gray-900 mb-3">📝 About</h3>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-700 leading-relaxed">
                                    {doctor.bio || `Dr. ${doctor.name} is a highly qualified ${doctor.specialization} with ${doctor.experience || 10} years of professional experience. Specialized in treating various conditions and providing comprehensive healthcare solutions to patients.`}
                                </p>
                            </div>
                        </div>

                        {/* Services Section */}
                        <div className="mb-8">
                            <h3 className="text-base font-bold text-gray-900 mb-3">🏥 Services</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                                    <p className="font-semibold text-gray-900">In-clinic Consultation</p>
                                    <p className="text-sm text-gray-600">Face-to-face appointments</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                                    <p className="font-semibold text-gray-900">Online Consultation</p>
                                    <p className="text-sm text-gray-600">Video call appointments</p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                                    <p className="font-semibold text-gray-900">Follow-up Visits</p>
                                    <p className="text-sm text-gray-600">Regular check-ups</p>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                                    <p className="font-semibold text-gray-900">Reports & Analysis</p>
                                    <p className="text-sm text-gray-600">Medical reports review</p>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t-2 border-gray-200 my-8"></div>

                        {/* Booking Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Book an Appointment?</h3>
                            <p className="text-gray-600 mb-6">
                                Select your preferred date and time to book a consultation with Dr. {doctor.name}
                            </p>
                            <button 
                                onClick={() => navigate(`/book-appointment/${doctorId}`)}
                                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold text-lg flex items-center justify-center gap-2"
                            >
                                <span>📅</span>
                                <span>Book Appointment Now</span>
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetailPage;
