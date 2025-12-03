import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookingPage = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [loading, setLoading] = useState(false);

    const timeSlots = ['17:00', '18:00', '19:00', '20:00'];

    const getDoctorById = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/doctor/getDoctorById', { doctorId }, {
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
            const res = await axios.post('http://localhost:5000/api/v1/user/getUserData', {}, {
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
            alert('Please select both date and time');
            return;
        }

        if (isDateInPast(date)) {
            alert('Cannot book for a past date');
            return;
        }

        if (isTimeInPast(date, time)) {
            alert('Cannot book for a past time');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/v1/appointment/check-availability', { doctorId, date, time }, {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            });
            
            if (res.data.success) {
                setIsAvailable(true);
                alert(res.data.message || 'This slot is available!');
            } else {
                setIsAvailable(false);
                alert(res.data.message || 'This slot is already booked');
            }
        } catch (error) {
            console.log(error);
            alert('Error checking availability');
        }
    };

    const handleBooking = async () => {
        if (!isAvailable) {
            alert('Please check availability first');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/v1/appointment/book-appointment', {
                doctorId,
                date,
                time,
                doctorInfo: doctor,
                userInfo: currentUser,
            }, {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            });

            if (res.data.success) {
                alert('Appointment booked successfully!');
                navigate('/');
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || 'Something went wrong');
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

    return (
        <div className="flex flex-col bg-gray-50 min-h-full">
            <div className="bg-white shadow">
                <div className="container mx-auto px-4 py-4">
                    <button 
                        onClick={() => navigate('/all-doctors')}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        ← Back to Doctors
                    </button>
                </div>
            </div>

            <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Doctor Information Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-6">Doctor Information</h2>
                        {doctor && (
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-2xl font-bold">👨⚕️</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Dr. {doctor.name}</h3>
                                        <p className="text-sm bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded mt-2">{doctor.specialization}</p>
                                    </div>
                                </div>
                                <div className="border-t pt-4 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Email</span>
                                        <span className="font-medium">{doctor.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Experience</span>
                                        <span className="font-medium">{doctor.experience} years</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Consultation Fee</span>
                                        <span className="font-bold text-blue-600 text-lg">₹{doctor.feesPerConsultation || doctor.fees || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Booking Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {!localStorage.getItem('token') ? (
                            <div className="text-center py-8">
                                <div className="mb-4">
                                    <span className="text-6xl">🔒</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Login Required</h3>
                                <p className="text-gray-600 mb-4">You need to login to book an appointment</p>
                                <button 
                                    onClick={() => navigate('/login')}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Login Now
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            min={getTodayDate()}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Select Time Slot</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {timeSlots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    onClick={() => setTime(slot)}
                                                    disabled={isTimeInPast(date, slot)}
                                                    className={`py-2 px-4 rounded-lg font-medium transition ${
                                                        isTimeInPast(date, slot)
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            : time === slot
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            onClick={checkAvailability}
                                            disabled={!date || !time}
                                            className="w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition"
                                        >
                                            Check Availability
                                        </button>

                                        {isAvailable && (
                                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                                <p className="text-sm text-green-700 font-medium">✓ Slot is available!</p>
                                            </div>
                                        )}

                                        <button
                                            onClick={handleBooking}
                                            disabled={!isAvailable || loading}
                                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed font-medium transition"
                                        >
                                            {loading ? 'Booking...' : 'Confirm Booking'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Information Card */}
                    {currentUser && (
                        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                            <h2 className="text-2xl font-bold mb-4">Your Information</h2>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-600 text-xl">👤</span>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{currentUser.name}</p>
                                    <p className="text-gray-600">{currentUser.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default BookingPage;