import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [userName, setUserName] = useState('');
    const [userData, setUserData] = useState(null);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileFormData, setProfileFormData] = useState({});
    const navigate = useNavigate();

    const getDoctors = async (term = '') => {
        try {
            const url = term 
                ? `http://localhost:5000/api/v1/doctor/search?specialization=${encodeURIComponent(term)}` 
                : 'http://localhost:5000/api/v1/doctor/getAllDoctors';
            const res = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token'),
                },
            });
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAppointments = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/appointment/get-appointments-by-user', {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token'),
                },
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelAppointment = async (appointmentId) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) {
            return;
        }
        
        try {
            const res = await axios.post('http://localhost:5000/api/v1/appointment/cancel-appointment', 
                { appointmentId },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token'),
                    },
                }
            );
            if (res.data.success) {
                alert("Appointment cancelled successfully");
                getAppointments();
            }
        } catch (error) {
            console.log(error);
            alert("Error cancelling appointment");
        }
    };

    const getUserInfo = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/user/getUserData', {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token'),
                },
            });
            if (res.data.success) {
                setUserName(res.data.data.name);
                setUserData(res.data.data);
                setProfileFormData(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleProfileUpdate = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/user/updateUserProfile', profileFormData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token'),
                },
            });
            if (res.data.success) {
                alert('Profile updated successfully');
                setUserData(res.data.data);
                setIsEditingProfile(false);
            }
        } catch (error) {
            console.log(error);
            alert('Error updating profile');
        }
    };

    const handleProfileFieldChange = (e) => {
        const { name, value } = e.target;
        setProfileFormData({
            ...profileFormData,
            [name]: value
        });
    };

    useEffect(() => {
        getDoctors();
        getAppointments();
        getUserInfo();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const timeout = setTimeout(() => {
            getDoctors(value);
        }, 500);

        setTypingTimeout(timeout);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
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
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b shadow sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">🏥</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">HealthCare</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-medium">{userName}</span>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8 space-y-8 max-w-6xl">
                {/* My Profile Section */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h2>
                        <p className="text-gray-600">View and manage your profile information</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-8">
                        {!isEditingProfile ? (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <p className="text-gray-600 text-sm">Full Name</p>
                                        <p className="text-xl font-semibold text-gray-900">{userData?.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Email</p>
                                        <p className="text-xl font-semibold text-gray-900">{userData?.email || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Phone</p>
                                        <p className="text-xl font-semibold text-gray-900">{userData?.phone || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Account Type</p>
                                        <p className="text-xl font-semibold text-gray-900">{userData?.isDoctor ? 'Doctor' : 'Patient'}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsEditingProfile(true)}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={profileFormData.name || ''}
                                            onChange={handleProfileFieldChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileFormData.email || ''}
                                            onChange={handleProfileFieldChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={profileFormData.phone || ''}
                                            onChange={handleProfileFieldChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-4">
                                    <button 
                                        onClick={handleProfileUpdate}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                                    >
                                        Save Changes
                                    </button>
                                    <button 
                                        onClick={() => setIsEditingProfile(false)}
                                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Find a Doctor Section */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Find a Doctor</h2>
                        <p className="text-gray-600">Search for doctors by specialization</p>
                    </div>
                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="Search by specialization (e.g., Cardiologist, Dermatologist)"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full max-w-2xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {doctors.length > 0 ? doctors.map((doctor) => (
                            <div key={doctor._id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                                        <p className="text-gray-500 text-sm">{doctor.email}</p>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                        {doctor.specialization}
                                    </span>
                                </div>
                                <div className="space-y-3 mb-4 text-sm border-t pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Experience</span>
                                        <span className="font-medium text-gray-900">{doctor.experience} years</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Consultation Fee</span>
                                        <span className="font-bold text-blue-600">₹{doctor.fees || doctor.feesPerConsultation}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => navigate(`/book-appointment/${doctor._id}`)}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                                >
                                    Book Appointment
                                </button>
                            </div>
                        )) : (
                            <p className="col-span-full text-center text-gray-500 py-8">No doctors found</p>
                        )}
                    </div>
                </section>

                {/* My Appointments Section */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h2>
                        <p className="text-gray-600">View and manage your appointments</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {appointments.length === 0 ? (
                            <div className="bg-white rounded-lg shadow p-12 text-center md:col-span-2">
                                <p className="text-gray-500 text-lg">No appointments yet</p>
                            </div>
                        ) : (
                            appointments.map((appointment) => (
                                <div key={appointment._id} className="bg-white rounded-lg shadow hover:shadow-md transition p-6 border-l-4 border-blue-500">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Dr. {appointment.doctorInfo?.name}</h3>
                                            <p className="text-gray-600 text-sm">{appointment.doctorInfo?.specialization}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                    <div className="space-y-2 text-sm mb-4 border-t pt-4">
                                        <div className="flex items-center gap-2">
                                            <span>📅</span>
                                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>🕐</span>
                                            <span>{appointment.time}</span>
                                        </div>
                                    </div>
                                    {appointment.status === 'pending' && (
                                        <button 
                                            onClick={() => handleCancelAppointment(appointment._id)}
                                            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium text-sm"
                                        >
                                            ✕ Cancel Appointment
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PatientDashboard;
