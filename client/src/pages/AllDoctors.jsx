import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import {
  FaSearch,
  FaSlidersH,
  FaTimes,
  FaStar,
  FaClock,
  FaRupeeSign,
  FaStethoscope,
  FaUsers,
  FaChevronDown
} from 'react-icons/fa';

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    maxFee: '',
    minRating: '',
    minExperience: ''
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const getAllDoctors = async (term = '') => {
    setIsLoading(true);
    try {
      const url = term
        ? `http://localhost:5000/api/v1/doctor/search?specialization=${encodeURIComponent(term)}`
        : 'http://localhost:5000/api/v1/doctor/getAllDoctors';
      const headers = localStorage.getItem('token')
        ? { Authorization: 'Bearer ' + localStorage.getItem('token') }
        : {};
      const res = await axios.get(url, { headers });
      if (res.data.success) {
        setDoctors(res.data.data);
        setFilteredDoctors(res.data.data);
      }
    } catch (error) {
      console.log('Error fetching doctors', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...doctors];

    if (filters.maxFee) {
      filtered = filtered.filter(doc => {
        const fee = doc.fees || doc.feesPerConsultation || doc.consultationFee || 0;
        return fee <= parseInt(filters.maxFee);
      });
    }

    if (filters.minRating) {
      filtered = filtered.filter(doc => (doc.rating || 0) >= parseFloat(filters.minRating));
    }

    if (filters.minExperience) {
      filtered = filtered.filter(doc => (doc.experience || 0) >= parseInt(filters.minExperience));
    }

    setFilteredDoctors(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      getAllDoctors(value);
    }, 500);
    setTypingTimeout(timeout);
  };

  const clearFilters = () => {
    setFilters({ maxFee: '', minRating: '', minExperience: '' });
    setShowFilters(false);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  useEffect(() => {
    window.scrollTo(0, 0);
    const filterSpecialty = location.state?.filterSpecialty;
    if (filterSpecialty) {
      setSearchTerm(filterSpecialty);
      getAllDoctors(filterSpecialty);
    } else {
      getAllDoctors();
    }
  }, [location.state]);

  useEffect(() => {
    applyFilters();
  }, [filters, doctors]);

  const specializations = [
    { name: 'Cardiologist', icon: '❤️' },
    { name: 'Dermatologist', icon: '✨' },
    { name: 'Neurologist', icon: '🧠' },
    { name: 'Pediatrician', icon: '👶' },
    { name: 'Orthopedic', icon: '🦴' },
    { name: 'Dentist', icon: '🦷' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-cyan-50/5 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600 text-sm font-medium mb-6">
                <FaStar className="w-4 h-4" />
            <span>Top Healthcare Professionals</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Doctor
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Search and book appointments with verified healthcare professionals in your area
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center">
                <FaStethoscope className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">1000+</p>
                <p className="text-sm">Expert Doctors</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <FaUsers className="w-5 h-5 text-cyan-500" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">50K+</p>
                <p className="text-sm">Happy Patients</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <FaStar className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">4.9</p>
                <p className="text-sm">Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Main Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-600/30">
                <FaSearch className="w-6 h-6 text-gray-400 ml-5" />
                <input
                  type="text"
                  placeholder="Search by specialization (e.g., Cardiologist, Dermatologist)"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="flex-1 px-4 py-4 sm:py-5 bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400 text-base sm:text-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      getAllDoctors('');
                    }}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100/50 transition-colors"
                  >
                    <FaTimes className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`w-full sm:w-auto px-6 py-4 sm:py-5 rounded-2xl shadow-lg border transition-all duration-300 flex items-center justify-center gap-3 font-medium ${
                  showFilters || activeFiltersCount > 0
                    ? 'bg-blue-600 text-white border-blue-600 shadow-blue-600/25'
                    : 'bg-white/80 backdrop-blur-xl text-gray-900 border-gray-200/50 hover:border-blue-600/30 hover:shadow-xl'
                }`}
              >
                <FaSlidersH className="w-5 h-5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 text-sm font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
                <FaChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Filter Dropdown */}
              {showFilters && (
                <div className="absolute right-0 sm:right-0 left-0 sm:left-auto mt-3 w-full sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-6 z-50 animate-scale-in">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <FaSlidersH className="w-5 h-5 text-blue-600" />
                      Filter Doctors
                    </h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 rounded-full hover:bg-gray-100/50 transition-colors"
                    >
                      <FaTimes className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-5">
                    {/* Max Fee */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                        <FaRupeeSign className="w-4 h-4 text-blue-600" />
                        Maximum Fee (₹)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 1000"
                        value={filters.maxFee}
                        onChange={(e) => setFilters({ ...filters, maxFee: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all text-gray-900 placeholder:text-gray-400"
                      />
                    </div>

                    {/* Min Rating */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                        <FaStar className="w-4 h-4 text-yellow-500" />
                        Minimum Rating
                      </label>
                      <select
                        value={filters.minRating}
                        onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all text-gray-900 appearance-none cursor-pointer"
                      >
                        <option value="">All Ratings</option>
                        <option value="4">⭐ 4+ Stars</option>
                        <option value="4.5">⭐ 4.5+ Stars</option>
                        <option value="5">⭐ 5 Stars Only</option>
                      </select>
                    </div>

                    {/* Min Experience */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                        <FaClock className="w-4 h-4 text-cyan-500" />
                        Minimum Experience
                      </label>
                      <select
                        value={filters.minExperience}
                        onChange={(e) => setFilters({ ...filters, minExperience: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all text-gray-900 appearance-none cursor-pointer"
                      >
                        <option value="">All Experience Levels</option>
                        <option value="5">5+ Years</option>
                        <option value="10">10+ Years</option>
                        <option value="15">15+ Years (Senior)</option>
                      </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={clearFilters}
                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200/80 transition-all font-medium"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all font-medium"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Specialization Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {specializations.map((spec, index) => (
              <button
                key={spec.name}
                onClick={() => {
                  setSearchTerm(spec.name);
                  getAllDoctors(spec.name);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  searchTerm === spec.name
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-white/60 backdrop-blur-sm text-gray-900 border border-gray-200/50 hover:border-blue-600/30 hover:bg-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mr-2">{spec.icon}</span>
                {spec.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredDoctors.length}</span> doctors
            {searchTerm && (
              <span>
                {' '}for "<span className="text-blue-600 font-medium">{searchTerm}</span>"
              </span>
            )}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 animate-pulse"
                >
                  <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-4" />
                  <div className="flex gap-3">
                    <div className="h-10 bg-gray-200 rounded-xl flex-1" />
                    <div className="h-10 bg-gray-200 rounded-xl flex-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100/50 flex items-center justify-center">
                <FaSearch className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Doctors Found</h3>
              <p className="text-gray-600 mb-6">
                Try searching with a different specialization or adjust your filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  clearFilters();
                  getAllDoctors('');
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-600/25 transition-all"
              >
                View All Doctors
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.map((doc, index) => (
                <div
                  key={doc._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <DoctorCard
                    id={doc._id}
                    name={doc.name}
                    specialty={doc.specialization}
                    rating={doc.rating || 4.5}
                    reviews={doc.reviews || 150}
                    experience={doc.experience || 5}
                    location={doc.location || 'Not specified'}
                    consultationFee={doc.fees || doc.feesPerConsultation}
                    image={doc.image}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;