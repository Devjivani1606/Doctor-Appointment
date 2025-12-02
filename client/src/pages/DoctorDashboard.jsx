import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaUsers, FaDollarSign, FaCheck, FaTimes, FaEdit, FaClock } from 'react-icons/fa';

const DoctorDashboard = () => {
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState({
        totalPatients: 0,
        totalEarnings: 0,
        pendingAppointments: 0,
        completedAppointments: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDoctorInfo();
        getDoctorAppointments();
    }, []);

    const getDoctorInfo = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/doctor/getDoctorInfo', {}, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            });
            if (res.data.success) {
                setDoctorInfo(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getDoctorAppointments = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/doctor/doctor-appointments', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            });
            if (res.data.success) {
                setAppointments(res.data.data);
                calculateStats(res.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (appointmentData) => {
        const uniquePatients = new Set(appointmentData.map(apt => apt.userId._id)).size;
        const totalEarnings = appointmentData
            .filter(apt => apt.status === 'completed')
            .reduce((sum, apt) => sum + (doctorInfo?.fees || 500), 0);
        const pending = appointmentData.filter(apt => apt.status === 'pending').length;
        const completed = appointmentData.filter(apt => apt.status === 'completed').length;

        setStats({
            totalPatients: uniquePatients,
            totalEarnings,
            pendingAppointments: pending,
            completedAppointments: completed
        });
    };

    const updateAppointmentStatus = async (appointmentId, status) => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/doctor/update-appointment-status', 
                { appointmentId, status },
                { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
            );
            if (res.data.success) {
                getDoctorAppointments();
                alert(`Appointment ${status} successfully!`);
            }
        } catch (error) {
            console.log(error);
            alert('Error updating appointment status');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome, Dr. {doctorInfo?.name}
                    </h1>
                    <p className="text-gray-600">{doctorInfo?.specialization}</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Patients</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.totalPatients}</p>
                            </div>
                            <FaUsers className="text-3xl text-blue-500" />
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Earnings</p>
                                <p className="text-2xl font-bold text-green-600">₹{stats.totalEarnings}</p>
                            </div>
                            <FaDollarSign className="text-3xl text-green-500" />
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-orange-600">{stats.pendingAppointments}</p>
                            </div>
                            <FaClock className="text-3xl text-orange-500" />
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-purple-600">{stats.completedAppointments}</p>
                            </div>
                            <FaCheck className="text-3xl text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Appointments Table */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-600" />
                        My Appointments
                    </h2>
                    
                    {appointments.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No appointments found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Patient</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Time</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appointment) => (
                                        <tr key={appointment._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <div>
                                                    <p className="font-medium text-gray-900">{appointment.userId.name}</p>
                                                    <p className="text-sm text-gray-500">{appointment.userId.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{appointment.date}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{appointment.time}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    appointment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {appointment.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {appointment.status === 'pending' && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => updateAppointmentStatus(appointment._id, 'approved')}
                                                            className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 flex items-center gap-1"
                                                        >
                                                            <FaCheck /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => updateAppointmentStatus(appointment._id, 'rejected')}
                                                            className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 flex items-center gap-1"
                                                        >
                                                            <FaTimes /> Reject
                                                        </button>
                                                    </div>
                                                )}
                                                {appointment.status === 'approved' && (
                                                    <button
                                                        onClick={() => updateAppointmentStatus(appointment._id, 'completed')}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                                                    >
                                                        Mark Complete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;