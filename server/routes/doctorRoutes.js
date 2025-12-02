const express = require('express');
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, getAllDoctorsController, searchDoctorsController, doctorLoginController, getDoctorAppointmentsController, updateAppointmentStatusController } = require('../controllers/doctorController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/doctor-login', doctorLoginController);
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);
router.post('/updateProfile', authMiddleware, updateProfileController);
router.post('/getDoctorById', getDoctorByIdController);
router.get('/getAllDoctors', getAllDoctorsController);
router.get('/search', searchDoctorsController);
router.get('/doctor-appointments', authMiddleware, getDoctorAppointmentsController);
router.post('/update-appointment-status', authMiddleware, updateAppointmentStatusController);

module.exports = router;
