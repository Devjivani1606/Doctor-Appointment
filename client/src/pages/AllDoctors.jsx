import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';

const AllDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const navigate = useNavigate();

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
            // Allow unauthenticated access for viewing doctors
            const headers = localStorage.getItem('token') 
                ? { Authorization: 'Bearer ' + localStorage.getItem('token') }
                : {};
            const res = await axios.get(url, { headers });
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log('Error fetching doctors', error);
        }
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
        getAllDoctors();
    }, []);

    useEffect(() => {
        getAllDoctors();
    }, []);

    return (
        <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Find a Doctor</h1>
                    <p className="text-gray-600 text-lg">Search and book appointments with top healthcare professionals</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="flex items-center bg-white rounded-xl shadow-md p-3 border border-gray-200">
                        <span className="text-2xl ml-2">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by specialization (e.g., Cardiologist, Dermatologist)"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Doctors Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {doctors.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">❌ No doctors found</p>
                            <p className="text-gray-400 text-sm mt-2">Try searching with a different specialization</p>
                        </div>
                    ) : (
                        doctors.map((doc) => (
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
