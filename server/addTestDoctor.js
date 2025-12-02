const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = require('./models/userModel');
require('dotenv').config();

const addTestDoctor = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const hashedPassword = await bcrypt.hash('doctor123', 10);
        
        const testDoctor = new userModel({
            name: 'Dr. John Smith',
            email: 'doctor@test.com',
            password: hashedPassword,
            isDoctor: true,
            specialization: 'Cardiologist',
            experience: 10,
            fees: 1000,
            about: 'Experienced cardiologist with 10 years of practice',
            phone: '+91 9876543210',
            timings: { start: '09:00', end: '17:00' }
        });

        await testDoctor.save();
        console.log('Test doctor added successfully!');
        console.log('Email: doctor@test.com');
        console.log('Password: doctor123');
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

addTestDoctor();