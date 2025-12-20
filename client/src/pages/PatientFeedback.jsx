import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaUserMd, FaCalendarAlt, FaCommentDots } from 'react-icons/fa';

const PatientFeedback = () => {
    const [completedAppointments, setCompletedAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCompletedAppointments();
    }, []);

    const fetchCompletedAppointments = async () => {
        try {
            // Test server connection first
            console.log('Testing server connection...');
            const testRes = await axios.get('https://doctor-appointment-mos8.onrender.com/api/v1/user/test');
            console.log('Server test response:', testRes.data);
            
            const res = await axios.post('https://doctor-appointment-mos8.onrender.com/api/v1/user/completed-appointments', {}, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            });
            console.log('API Response:', res.data);
            if (res.data.success) {
                console.log('Completed appointments:', res.data.data);
                setCompletedAppointments(res.data.data);
            }
            setLoading(false);
        } catch (error) {
            console.log('Error fetching appointments:', error);
            console.log('Error details:', error.response?.data);
            setLoading(false);
        }
    };

    const handleSubmitFeedback = async () => {
        if (!selectedAppointment || rating === 0) {
            alert('Please select an appointment and provide a rating');
            return;
        }

        setSubmitting(true);
        try {
            const res = await axios.post('https://doctor-appointment-mos8.onrender.com/api/v1/user/submit-feedback', {
                appointmentId: selectedAppointment._id,
                doctorId: selectedAppointment.doctorId,
                rating,
                feedback
            }, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            });

            if (res.data.success) {
                alert('Feedback submitted successfully!');
                setSelectedAppointment(null);
                setRating(0);
                setFeedback('');
                fetchCompletedAppointments();
            }
        } catch (error) {
            console.log(error);
            alert('Error submitting feedback');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 flex items-center justify-center">
                <p className="text-xl text-gray-600">Loading appointments...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Feedback</h1>
                    <p className="text-gray-600">Share your experience with doctors you've consulted</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                    <p className="text-sm text-yellow-800">Debug: Found {completedAppointments.length} completed appointments</p>
                    <p className="text-xs text-yellow-600">Check browser console for more details</p>
                </div>

                {completedAppointments.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <FaCommentDots className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Completed Appointments</h3>
                        <p className="text-gray-600">You haven't completed any appointments yet to provide feedback.</p>
                        <p className="text-sm text-gray-500 mt-2">Make sure doctor has marked your appointment as 'completed'</p>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {/* Completed Appointments List */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Completed Appointments</h2>
                            <div className="space-y-4">
                                {completedAppointments.map((appointment) => (
                                    <div 
                                        key={appointment._id} 
                                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                            selectedAppointment?._id === appointment._id 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                        onClick={() => setSelectedAppointment(appointment)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                                    <FaUserMd className="text-white text-xl" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">Dr. {appointment.doctorInfo?.name || appointment.doctorId?.name || 'Unknown'}</h3>
                                                    <p className="text-sm text-gray-600">{appointment.doctorInfo?.specialization || appointment.doctorId?.specialization || 'N/A'}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center text-sm text-gray-600 mb-1">
                                                    <FaCalendarAlt className="mr-1" />
                                                    {new Date(appointment.date).toLocaleDateString()}
                                                </div>
                                                <p className="text-sm text-gray-600">{appointment.time}</p>
                                                {appointment.feedbackGiven && (
                                                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                                                        Feedback Given
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feedback Form */}
                        {selectedAppointment && !selectedAppointment.feedbackGiven && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    Provide Feedback for Dr. {selectedAppointment.doctorInfo?.name || selectedAppointment.doctorId?.name || 'Unknown'}
                                </h2>
                                
                                <div className="space-y-6">
                                    {/* Rating */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Rate your experience (1-5 stars)
                                        </label>
                                        <div className="flex space-x-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    className={`text-3xl cursor-pointer transition-colors ${
                                                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                                    }`}
                                                    onClick={() => setRating(star)}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Feedback Text */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Share your experience (optional)
                                        </label>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rows="4"
                                            placeholder="Tell us about your experience with the doctor..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleSubmitFeedback}
                                            disabled={submitting || rating === 0}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                                        >
                                            {submitting ? 'Submitting...' : 'Submit Feedback'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedAppointment(null);
                                                setRating(0);
                                                setFeedback('');
                                            }}
                                            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedAppointment && selectedAppointment.feedbackGiven && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-green-800 mb-2">Feedback Already Submitted</h3>
                                <p className="text-green-700">You have already provided feedback for this appointment with Dr. {selectedAppointment.doctorInfo?.name || selectedAppointment.doctorId?.name || 'Unknown'}.</p>
                            </div>
                        )}

                        {/* Doctor Instructions Section */}
                        {selectedAppointment && selectedAppointment.doctorInstructions && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                                    <FaUserMd />
                                    Doctor's Instructions
                                </h3>
                                <div className="bg-white rounded-lg p-4 border border-blue-100">
                                    <p className="text-gray-700 whitespace-pre-wrap">{selectedAppointment.doctorInstructions}</p>
                                </div>
                                <p className="text-xs text-blue-600 mt-2">Please follow these instructions carefully for better recovery</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientFeedback;