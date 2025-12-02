const express = require('express');
const {
    bookAppointmentController,
    checkAvailabilityController,
    getAppointmentsByDoctorController,
    updateStatusController,
    getAppointmentsByUserIdController,
    cancelAppointmentController
} = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/book-appointment', authMiddleware, bookAppointmentController);
router.post('/check-availability', authMiddleware, checkAvailabilityController);
router.post('/get-appointments-by-doctor', authMiddleware, getAppointmentsByDoctorController);
router.post('/get-appointments-by-user', authMiddleware, getAppointmentsByUserIdController);
router.post('/update-status', authMiddleware, updateStatusController);
router.get('/doctor-appointments', authMiddleware, getAppointmentsByDoctorController);
router.post('/cancel-appointment', authMiddleware, cancelAppointmentController);

module.exports = router;
