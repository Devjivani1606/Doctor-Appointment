import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';

const AllDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        maxFee: '',
        minRating: '',
        minExperience: ''
    });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    const getAllDoctors = async (term = '') => {
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

    return (
        <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Find a Doctor</h1>
                    <p className="text-gray-600 text-lg">Search and book appointments with top healthcare professionals</p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8">
                    <div className="flex gap-3">
                        {/* Search Bar */}
                        <div className="flex-1 flex items-center bg-white rounded-xl shadow-md p-3 border border-gray-200">
                            <span className="text-2xl ml-2">🔍</span>
                            <input
                                type="text"
                                placeholder="Search by specialization (e.g., Cardiologist, Dermatologist)"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                        
                        {/* Filter Button */}
                        <div className="relative">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-md hover:bg-gray-50 transition flex items-center gap-2 font-medium text-gray-700"
                            >
                                <span className="text-xl">⚙️</span>
                                <span>Filters</span>
                                <span className="text-sm">{showFilters ? '▲' : '▼'}</span>
                            </button>
                            
                            {/* Filter Dropdown */}
                            {showFilters && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-50">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Filter Doctors</h3>
                                    
                                    <div className="space-y-4">
                                        {/* Max Fee */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Max Fee (₹)</label>
                                            <input
                                                type="number"
                                                placeholder="e.g., 1000"
                                                value={filters.maxFee}
                                                onChange={(e) => setFilters({...filters, maxFee: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        
                                        {/* Min Rating */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
                                            <select
                                                value={filters.minRating}
                                                onChange={(e) => setFilters({...filters, minRating: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">All Ratings</option>
                                                <option value="4">4+ Stars</option>
                                                <option value="4.5">4.5+ Stars</option>
                                                <option value="5">5 Stars</option>
                                            </select>
                                        </div>
                                        
                                        {/* Min Experience */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Min Experience</label>
                                            <select
                                                value={filters.minExperience}
                                                onChange={(e) => setFilters({...filters, minExperience: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">All Experience</option>
                                                <option value="5">5+ Years</option>
                                                <option value="10">10+ Years</option>
                                                <option value="15">15+ Years</option>
                                            </select>
                                        </div>
                                        
                                        {/* Buttons */}
                                        <div className="flex gap-2 pt-2">
                                            <button
                                                onClick={() => {
                                                    setFilters({ maxFee: '', minRating: '', minExperience: '' });
                                                    setShowFilters(false);
                                                }}
                                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                                            >
                                                Clear
                                            </button>
                                            <button
                                                onClick={() => setShowFilters(false)}
                                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Doctors Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredDoctors.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">❌ No doctors found</p>
                            <p className="text-gray-400 text-sm mt-2">Try searching with a different specialization</p>
                        </div>
                    ) : (
                        filteredDoctors.map((doc) => (
                            <DoctorCard
                                key={doc._id}
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
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllDoctors;