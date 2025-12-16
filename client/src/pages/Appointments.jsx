import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserMd, FaCalendarAlt, FaClock, FaTimes, FaCheck, FaHourglassHalf, FaBan } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAppointments = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/api/v1/appointment/get-appointments-by-user', {}, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log('Error fetching appointments', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (appointmentId) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
        try {
            const res = await axios.post('http://localhost:5000/api/v1/appointment/cancel-appointment', { appointmentId }, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            });
            if (res.data.success) {
                alert('Appointment cancelled successfully');
                getAppointments();
            }
        } catch (err) {
            console.log(err);
            alert('Error cancelling appointment');
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-700 border border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
            case 'rejected':
                return 'bg-red-100 text-red-700 border border-red-200';
            case 'cancelled':
                return 'bg-gray-100 text-gray-700 border border-gray-200';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
                return <FaCheck />;
            case 'pending':
                return <FaHourglassHalf />;
            case 'rejected':
                return <FaTimes />;
            case 'cancelled':
                return <FaBan />;
            default:
                return <FaCheck />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 p-6 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <MdDashboard className="text-4xl text-blue-600" />
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">My Appointments</h1>
                    </div>
                    <p className="text-lg text-gray-600">View and manage your scheduled appointments</p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
                        </div>
                        <span className="ml-4 text-gray-600 font-medium">Loading your appointments...</span>
                    </div>
                ) : appointments.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                        <div className="text-6xl mb-4 text-blue-500">
                            <FaCalendarAlt />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Appointments Yet</h3>
                        <p className="text-gray-600 mb-6">You don't have any scheduled appointments. Start by booking an appointment with a doctor!</p>
                        <a href="/booking" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                            Book an Appointment
                        </a>
                    </div>
                ) : (
                    /* Appointments Grid */
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                        {appointments.map((a, index) => (
                            <div
                                key={a._id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100 transform hover:scale-105 hover:-translate-y-1"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="p-6">
                                    {/* Doctor Info & Status */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                 Dr. {a.doctorInfo?.name || 'Doctor'}
                                            </h3>
                                            <p className="text-indigo-600 font-semibold text-xs mt-1">
                                                {a.doctorInfo?.specialization || 'Specialist'}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getStatusColor(a.status)}`}>
                                            {getStatusIcon(a.status)}
                                            <span className="capitalize">{a.status}</span>
                                        </span>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-gray-100 my-4"></div>

                                    {/* Appointment Details */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-3 text-gray-700 text-sm bg-gray-50 rounded-lg p-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <FaCalendarAlt className="text-blue-600 text-sm" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-medium">Date</p>
                                                <p className="font-bold text-sm text-gray-900">
                                                    {new Date(a.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-gray-700 text-sm bg-gray-50 rounded-lg p-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <FaClock className="text-green-600 text-sm" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-medium">Time</p>
                                                <p className="font-bold text-sm text-gray-900">{a.time}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {a.status === 'pending' && (
                                        <button
                                            onClick={() => handleCancel(a._id)}
                                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 transform hover:scale-105 text-sm shadow-lg hover:shadow-xl"
                                        >
                                            <FaTimes />
                                            Cancel
                                        </button>
                                    )}
                                    {a.status !== 'pending' && (
                                        <button
                                            disabled
                                            className="w-full bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 font-semibold py-3 rounded-xl cursor-not-allowed opacity-75 text-sm"
                                        >
                                            {a.status === 'approved' ? (
                                                <span className="flex items-center gap-2">
                                                    <FaCheck /> Confirmed
                                                </span>
                                            ) : 'Not Available'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;