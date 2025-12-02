const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/doctor', require('./routes/doctorRoutes'));
app.use('/api/v1/appointment', require('./routes/appointmentRoutes'));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(' MongoDB Connected Successfully');
}).catch(err => {
    console.log(' MongoDB Connection Error:', err.message);
    process.exit(1);
});

app.get('/', (req, res) => {
    res.json({
        message: 'Hospital Appointment API is running successfully! 🏥',
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
    console.log(` API URL: http://localhost:${PORT}`);
});
