import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DoctorCard = ({
  id,
  name,
  specialty,
  rating,
  reviews,
  experience,
  location,
  nextAvailable,
  consultationFee,
  fees,
  feesPerConsultation,
  image,
}) => {
  const fee = consultationFee || fees || feesPerConsultation;
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBookClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginModal(true);
    } else {
      navigate(`/book-appointment/${id}`);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all group">
      {/* Doctor Image/Avatar */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
        {image ? (
          <img
            src={`http://localhost:8080${image}`}
            alt={name}
            className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-blue-600 border-4 border-white">
            {name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1.5 shadow-md flex items-center space-x-1">
          <span className="text-yellow-400">⭐</span>
          <span className="text-sm font-semibold text-gray-900">{rating || 4.5}</span>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-6 space-y-4">
        {/* Name & Specialty */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            Dr. {name}
          </h3>
          <p className="text-sm text-gray-600">{specialty}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <span className="text-lg">🏆</span>
            <span>{experience || 0} yrs exp</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-lg">⭐</span>
            <span>{reviews || 0} reviews</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="text-lg">📍</span>
          <span className="truncate">{location || 'Not specified'}</span>
        </div>

        {/* Availability & Fee */}
        <div className="pt-4 border-t border-gray-200 space-y-2">
          {nextAvailable && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-lg">⏰</span>
                <span>Next available:</span>
              </div>
              <span className="font-medium text-gray-900">{nextAvailable}</span>
            </div>
          )}
          
          {fee && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Consultation fee:</span>
              <span className="font-semibold text-blue-600">₹{fee}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Link
            to={`/doctor/${id}`}
            className="flex-1 px-4 py-2.5 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-center font-medium text-sm"
          >
            View Profile
          </Link>
          <button
            onClick={handleBookClick}
            className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 font-medium text-sm group/btn"
          >
            <span>📅</span>
            <span>Book Now</span>
            <span>→</span>
          </button>
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200 animate-in">
              <div className="text-5xl mb-4">🔐</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Login Required</h2>
              <p className="text-gray-600 mb-6">
                You need to log in to book an appointment. This helps us keep your medical information secure.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-full bg-transparent border-2 border-gray-300 text-gray-900 py-3 rounded-lg font-semibold hover:border-blue-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
