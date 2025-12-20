import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    FaArrowLeft, FaUserMd, FaCalendarAlt, FaClock, FaMoneyBillWave, 
    FaCheckCircle, FaLock, FaStar, FaMapMarkerAlt, FaGraduationCap,
    FaStethoscope, FaSpinner
} from 'react-icons/fa';
import Notification from '../components/Notification';

const BookingPage = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkingAvailability, setCheckingAvailability] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '', isVisible: false });

    const getAvailableTimeSlots = () => {
        if (!date || !doctor?.availableSlots) {
            return [];
        }
        
        const selectedDate = new Date(date);
        const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
        
        const daySlots = doctor.availableSlots.find(slot => slot.day === dayName);
        return daySlots?.timeSlots || [];
    };

    const getDoctorById = async () => {
        try {
            const res = await axios.post('https://doctor-appointment-mos8.onrender.com/api/v1/doctor/getDoctorById', { doctorId }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token'),
                },
            });
            if (res.data.success) {
                setDoctor(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCurrentUser = async () => {
        try {
            const res = await axios.post('https://doctor-appointment-mos8.onrender.com/api/v1/user/getUserData', {}, {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            });
            if (res.data.success) {
                setCurrentUser(res.data.data);
            }
        } catch (error) {
            console.log('Error fetching current user', error);
        }
    };

    const isDateInPast = (d) => {
        if (!d) return false;
        const selected = new Date(d + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        selected.setHours(0, 0, 0, 0);
        return selected < today;
    };

    const isTimeInPast = (d, t) => {
        if (!d || !t) return false;
        const today = new Date();
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        const selectedDate = new Date(d + 'T00:00:00');
        selectedDate.setHours(0, 0, 0, 0);
        
        if (selectedDate.getTime() === todayDate.getTime()) {
            const [hour, minute] = t.split(':').map(Number);
            const appointmentDateTime = new Date();
            appointmentDateTime.setHours(hour, minute, 0, 0);
            return appointmentDateTime < today;
        }
        return false;
    };

    const checkAvailability = async () => {
        if (!date || !time) {
            setNotification({ message: 'Please select both date and time', type: 'error', isVisible: true });
            return;
        }

        if (isDateInPast(date)) {
            setNotification({ message: 'Cannot book for a past date', type: 'error', isVisible: true });
            return;
        }

        if (isTimeInPast(date, time)) {
            setNotification({ message: 'Cannot book for a past time', type: 'error', isVisible: true });
            return;
        }

        setCheckingAvailability(true);
        try {
            const res = await axios.post('https://doctor-appointment-mos8.onrender.com/api/v1/appointment/check-availability', { doctorId, date, time }, {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            });
            
            if (res.data.success) {
                setIsAvailable(true);
                setNotification({ message: res.data.message || 'This slot is available!', type: 'success', isVisible: true });
            } else {
                setIsAvailable(false);
                setNotification({ message: res.data.message || 'This slot is already booked', type: 'error', isVisible: true });
            }
        } catch (error) {
            console.log(error);
            setNotification({ message: 'Error checking availability', type: 'error', isVisible: true });
        } finally {
            setCheckingAvailability(false);
        }
    };

    const handleBooking = async () => {
        if (!isAvailable) {
            setNotification({ message: 'Please check availability first', type: 'error', isVisible: true });
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post('https://doctor-appointment-mos8.onrender.com/api/v1/appointment/book-appointment', {
                doctorId,
                date,
                time,
                doctorInfo: doctor,
                userInfo: currentUser,
            }, {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            });

            if (res.data.success) {
                setNotification({ message: 'Appointment booked successfully!', type: 'success', isVisible: true });
                setTimeout(() => navigate('/appointments'), 1500);
            } else {
                setNotification({ message: res.data.message, type: 'error', isVisible: true });
            }
        } catch (error) {
            console.log(error);
            setNotification({ message: error.response?.data?.message || 'Something went wrong', type: 'error', isVisible: true });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDoctorById();
        if (localStorage.getItem('token')) {
            getCurrentUser();
        }
    }, [doctorId]);

    useEffect(() => {
        setIsAvailable(false);
    }, [date, time]);

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (!doctor) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
                    <p className="text-xl text-gray-600">Loading doctor information...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Notification 
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={() => setNotification({ ...notification, isVisible: false })}
            />
            <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <button 
                        onClick={() => navigate('/all-doctors')}
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        <FaArrowLeft />
                        <span>Back to Doctors</span>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Doctor Information Card */}
                    <div className="xl:col-span-2">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200">
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Doctor Avatar & Basic Info */}
                                <div className="flex-shrink-0">
                                    {doctor.image ? (
                                        <img 
                                            src={doctor.image} 
                                            alt={`Dr. ${doctor.name}`} 
                                            className="w-32 h-32 rounded-2xl object-cover shadow-xl border-4 border-blue-100"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                                            <span className="text-white text-4xl font-bold">{doctor.name?.charAt(0) || 'D'}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Doctor Details */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dr. {doctor.name}</h1>
                                        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                            <FaStethoscope />
                                            <span>{doctor.specialization}</span>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                                            <div className="flex items-center space-x-2 text-green-700 mb-1">
                                                <FaStar className="text-sm" />
                                                <span className="text-xs font-medium">Experience</span>
                                            </div>
                                            <p className="text-lg font-bold text-green-800">{doctor.experience || 5} years</p>
                                        </div>
                                        
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                                            <div className="flex items-center space-x-2 text-blue-700 mb-1">
                                                <FaMoneyBillWave className="text-sm" />
                                                <span className="text-xs font-medium">Fee</span>
                                            </div>
                                            <p className="text-lg font-bold text-blue-800">₹{doctor.feesPerConsultation || doctor.fees || 500}</p>
                                        </div>

                                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                                            <div className="flex items-center space-x-2 text-purple-700 mb-1">
                                                <FaUserMd className="text-sm" />
                                                <span className="text-xs font-medium">Rating</span>
                                            </div>
                                            <p className="text-lg font-bold text-purple-800">4.8/5</p>
                                        </div>

                                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                                            <div className="flex items-center space-x-2 text-orange-700 mb-1">
                                                <FaCheckCircle className="text-sm" />
                                                <span className="text-xs font-medium">Patients</span>
                                            </div>
                                            <p className="text-lg font-bold text-orange-800">500+</p>
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {doctor.location && (
                                            <div className="flex items-start space-x-3">
                                                <FaMapMarkerAlt className="text-gray-400 mt-1" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">Location</p>
                                                    <p className="text-gray-600">{doctor.location}</p>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {doctor.qualifications && (
                                            <div className="flex items-start space-x-3">
                                                <FaGraduationCap className="text-gray-400 mt-1" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">Qualifications</p>
                                                    <p className="text-gray-600">{doctor.qualifications}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {doctor.about && (
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <h3 className="font-medium text-gray-700 mb-2">About</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{doctor.about}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Card */}
                    <div className="xl:col-span-1">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200 sticky top-8">
                            {!localStorage.getItem('token') ? (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FaLock className="text-3xl text-red-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Login Required</h3>
                                    <p className="text-gray-600 mb-6">Please login to book an appointment with this doctor</p>
                                    <button 
                                        onClick={() => navigate('/login')}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg"
                                    >
                                        Login Now
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Appointment</h2>
                                        <p className="text-gray-600">Select your preferred date and time</p>
                                    </div>

                                    {/* Date Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            <FaCalendarAlt className="inline mr-2" />
                                            Select Date
                                        </label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            min={getTodayDate()}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    {/* Time Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            <FaClock className="inline mr-2" />
                                            Select Time
                                        </label>
                                        {date ? (
                                            getAvailableTimeSlots().length > 0 ? (
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {getAvailableTimeSlots().map((slot) => (
                                                        <button
                                                            key={slot}
                                                            onClick={() => setTime(slot)}
                                                            disabled={date && isTimeInPast(date, slot)}
                                                            className={`py-3 px-4 text-sm font-medium rounded-xl border-2 transition-all duration-200 ${
                                                                time === slot
                                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg transform scale-105'
                                                                    : date && isTimeInPast(date, slot)
                                                                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                                                                    : 'bg-white text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md active:scale-95'
                                                            }`}
                                                        >
                                                            <FaClock className="inline mr-1 text-xs" />
                                                            {slot}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                                                    <FaClock className="text-3xl text-orange-400 mx-auto mb-2" />
                                                    <p className="text-orange-600 font-medium">Doctor is not available on this day</p>
                                                    <p className="text-orange-500 text-sm mt-1">Please select another date</p>
                                                </div>
                                            )
                                        ) : (
                                            <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                                <FaClock className="text-3xl text-blue-400 mx-auto mb-2" />
                                                <p className="text-blue-600 font-medium">Please select a date first</p>
                                                <p className="text-blue-500 text-sm mt-1">Available time slots will appear here</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Availability Check */}
                                    <button
                                        onClick={checkAvailability}
                                        disabled={!date || !time || checkingAvailability}
                                        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all font-medium shadow-lg flex items-center justify-center space-x-2"
                                    >
                                        {checkingAvailability ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                <span>Checking...</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaCheckCircle />
                                                <span>Check Availability</span>
                                            </>
                                        )}
                                    </button>

                                    {/* Booking Confirmation */}
                                    {isAvailable && (
                                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                            <div className="flex items-center space-x-2 text-green-800 mb-3">
                                                <FaCheckCircle />
                                                <span className="font-medium">Slot Available!</span>
                                            </div>
                                            <div className="text-sm text-green-700 mb-4">
                                                <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
                                                <p><strong>Time:</strong> {time}</p>
                                                <p><strong>Fee:</strong> ₹{doctor.feesPerConsultation || doctor.fees || 500}</p>
                                            </div>
                                            <button
                                                onClick={handleBooking}
                                                disabled={loading}
                                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all font-medium shadow-lg flex items-center justify-center space-x-2"
                                            >
                                                {loading ? (
                                                    <>
                                                        <FaSpinner className="animate-spin" />
                                                        <span>Booking...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCalendarAlt />
                                                        <span>Confirm Booking</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default BookingPage;