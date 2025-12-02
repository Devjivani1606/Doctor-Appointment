import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getDoctorData = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/user/getUserData",
                {},
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            if (res.data.success) {
                setDoctor(res.data.data);
            } else {
                localStorage.clear();
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            localStorage.clear();
            navigate("/login");
        }
    };

    const getAppointments = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/v1/appointment/doctor-appointments",
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            if (res.data.success) {
                setAppointments(res.data.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleApproveAppointment = async (appointmentId) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/appointment/update-status",
                { appointmentId, status: 'approved' },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            if (res.data.success) {
                alert("✅ Appointment approved successfully");
                getAppointments();
            }
        } catch (error) {
            console.log(error);
            alert("Error approving appointment");
        }
    };

    const handleRejectAppointment = async (appointmentId) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/appointment/update-status",
                { appointmentId, status: 'rejected' },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            if (res.data.success) {
                alert("❌ Appointment rejected");
                getAppointments();
            }
        } catch (error) {
            console.log(error);
            alert("Error rejecting appointment");
        }
    };

    useEffect(() => {
        getDoctorData();
        getAppointments();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-700 border border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
            case 'rejected': return 'bg-red-100 text-red-700 border border-red-200';
            case 'cancelled': return 'bg-gray-100 text-gray-700 border border-gray-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Header */}
            <header className="bg-white border-b shadow sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow">
                            <span className="text-white text-lg">👨‍⚕️</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Doctor Portal</h1>
                            <p className="text-xs text-gray-500">Appointments Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-gray-800 font-semibold">Dr. {doctor?.name || 'Doctor'}</p>
                            <p className="text-xs text-gray-500">{doctor?.specialization}</p>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
                {/* Doctor Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-blue-600">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome, Dr. {doctor?.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-gray-600 text-sm">Specialization</p>
                            <p className="text-xl font-bold text-blue-600">{doctor?.specialization || 'N/A'}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-gray-600 text-sm">Experience</p>
                            <p className="text-xl font-bold text-green-600">{doctor?.experience || 0} Years</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="text-gray-600 text-sm">Consultation Fee</p>
                            <p className="text-xl font-bold text-purple-600">₹{doctor?.fees || 0}</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                            <p className="text-gray-600 text-sm">Total Appointments</p>
                            <p className="text-xl font-bold text-orange-600">{appointments.length}</p>
                        </div>
                    </div>
                </div>

                {/* Appointments Section */}
                <div>
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Appointments</h2>
                        <p className="text-gray-600">Review and manage patient appointment requests</p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <div className="inline-block">
                                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                                </div>
                                <p className="text-gray-600">Loading appointments...</p>
                            </div>
                        </div>
                    ) : appointments.length === 0 ? (
                        <div className="bg-white rounded-xl shadow p-12 text-center">
                            <p className="text-3xl mb-3">📅</p>
                            <p className="text-gray-500 text-lg">No appointments yet</p>
                            <p className="text-gray-400 text-sm mt-2">Patient appointments will appear here</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {appointments.map((appointment) => (
                                <div 
                                    key={appointment._id} 
                                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-t-4 border-blue-500"
                                >
                                    {/* Patient Info */}
                                    <div className="mb-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">
                                                    👤 {appointment.userInfo?.name || 'Patient'}
                                                </h3>
                                                <p className="text-sm text-gray-600">{appointment.userInfo?.email}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                                                {appointment.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Appointment Details */}
                                    <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">📅</span>
                                            <div>
                                                <p className="text-xs text-gray-600">Date</p>
                                                <p className="font-semibold text-gray-900">
                                                    {new Date(appointment.date).toLocaleDateString('en-IN', {
                                                        weekday: 'short',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">🕐</span>
                                            <div>
                                                <p className="text-xs text-gray-600">Time</p>
                                                <p className="font-semibold text-gray-900">{appointment.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">📱</span>
                                            <div>
                                                <p className="text-xs text-gray-600">Phone</p>
                                                <p className="font-semibold text-gray-900">{appointment.userInfo?.phone || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons - Only for Pending Appointments */}
                                    {appointment.status === 'pending' ? (
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleApproveAppointment(appointment._id)}
                                                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
                                            >
                                                <span>✅</span>
                                                <span>Accept</span>
                                            </button>
                                            <button 
                                                onClick={() => handleRejectAppointment(appointment._id)}
                                                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold flex items-center justify-center gap-2"
                                            >
                                                <span>❌</span>
                                                <span>Reject</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-100 rounded-lg py-3 text-center">
                                            <p className="text-gray-600 font-semibold text-sm">
                                                {appointment.status === 'approved' ? '✅ Already Approved' : '❌ Rejected'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DoctorDashboard;
