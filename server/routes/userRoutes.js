const express = require('express');
const { loginController, registerController, authController, updateUserProfileController, getCompletedAppointmentsController, submitFeedbackController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// routes
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/getUserData', authMiddleware, authController);
router.post('/updateUserProfile', authMiddleware, updateUserProfileController);
router.post('/completed-appointments', authMiddleware, getCompletedAppointmentsController);
router.post('/submit-feedback', authMiddleware, submitFeedbackController);

// Test route
router.get('/test', (req, res) => {
    res.json({ success: true, message: 'Test route working' });
});

module.exports = router;
