const express = require('express');
const { loginController, registerController, authController, updateUserProfileController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// routes
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/getUserData', authMiddleware, authController);
router.post('/updateUserProfile', authMiddleware, updateUserProfileController);

module.exports = router;
