import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            case 'approved': return 'bg-green-100 text-green-700 border border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
            case 'rejected': return 'bg-red-100 text-red-700 border border-red-200';
            case 'cancelled': return 'bg-gray-100 text-gray-700 border border-gray-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h2>
                    <p className="text-gray-600">View and manage your appointments</p>
                </div>
                {loading && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Loading...</p>
                    </div>
                )}
                <div className="grid gap-6 md:grid-cols-2">
                    {!loading && appointments.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-12 text-center md:col-span-2">
                            <p className="text-gray-500 text-lg">No appointments yet</p>
                        </div>
                    ) : (
                        appointments.map(a => (
                            <div key={a._id} className="bg-white rounded-lg shadow hover:shadow-md transition p-6 border-l-4 border-blue-500">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Dr. {a.doctorId?.name || a.doctorInfo?.name || 'Doctor'}</h3>
                                        <p className="text-gray-600 text-sm">{a.doctorId?.specialization || a.doctorInfo?.specialization || ''}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(a.status)}`}>
                                        {a.status}
                                    </span>
                                </div>
                                <div className="space-y-2 text-sm mb-4 border-t pt-4">
                                    {/* Doctor Instructions */}
                                    {a.doctorInstructions && (
                                    <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <h4 className="text-sm font-semibold text-blue-800 mb-1">
                                        Doctor’s Instructions
                                        </h4>
                                        <p className="text-gray-700 whitespace-pre-wrap text-sm">
                                        {a.doctorInstructions}
                                        </p>
                                    </div>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <span>📅</span>
                                        <span>{new Date(a.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>🕐</span>
                                        <span>{a.time}</span>
                                    </div>
                                </div>
                                {a.status === 'pending' && (
                                    <button 
                                        onClick={() => handleCancel(a._id)}
                                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium text-sm"
                                    >
                                        ✕ Cancel Appointment
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Appointments;
