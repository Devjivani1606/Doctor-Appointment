import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Guest');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.post('http://localhost:5000/api/v1/user/getUserData', {}, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                });
                if (res.data.success) {
                    setUserName(res.data.data.name || 'User');
                }
            } catch (err) {
                setUserName('Guest');
            }
        };
        fetchUser();
    }, []);

    return (
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>DocApp</h1>
                    <p className="text-xs text-gray-600">Healthcare at your fingertips</p>
                </div>
                <nav className="flex items-center gap-4">
                    <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/')}>Home</button>
                    <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/all-doctors')}>All Doctors</button>
                    <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/about')}>About Us</button>
                    <button className="text-gray-700 hover:text-blue-600" onClick={() => navigate('/appointments')}>Appointments</button>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">{userName}</span>
                <button
                    onClick={() => { localStorage.clear(); navigate('/login'); }}
                    className="text-red-500 hover:text-red-700"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
