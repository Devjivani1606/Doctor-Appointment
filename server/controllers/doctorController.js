const userModel = require('../models/userModel');
const appointmentModel = require('../models/appointmentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await userModel.findOne({ _id: req.body.userId });
        res.status(200).send({ success: true, message: 'Doctor data fetch success', data: doctor });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error in fetching Doctor Details' });
    }
};

const updateProfileController = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log('===== Update Profile Request =====');
        console.log('userId:', userId);
        console.log('Full request body:', JSON.stringify(req.body, null, 2));

        let updatedData = {};

        const allowedFields = [
            "name", "email", "phone",
            "specialization", "experience",
            "fees", "about", "timings",
            "location", "qualifications", "image"
        ];

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updatedData[field] = req.body[field];
            }
        });

        // Handle file upload (if using multer)
        if (req.file) {
            updatedData.image = `/uploads/${req.file.filename}`;
        }

        console.log('Data to be updated:', JSON.stringify(updatedData, null, 2));

        const doctor = await userModel.findOneAndUpdate(
            { _id: userId },
            { $set: updatedData },
            { new: true }
        );

        console.log('Updated doctor document:', doctor);
        console.log('====== Update Complete ======');

        res.status(201).send({
            success: true,
            message: 'Doctor Profile Updated Successfully',
            data: doctor
        });
    } catch (error) {
        console.log('===== Update Error =====');
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Doctor Profile Update Issue',
            error
        });
    }
};




const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await userModel.findOne({ _id: req.body.doctorId });
        res.status(200).send({ success: true, message: 'Single Doc Info Fetched', data: doctor });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error in Single doctor info' });
    }
}

const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await userModel.find({ isDoctor: true });
        res.status(200).send({ success: true, message: 'Doctors Lists Fetched Successfully', data: doctors });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error while fetching doctors' });
    }
};

const searchDoctorsController = async (req, res) => {
    try {
        const q = req.query.specialization || '';
        let doctors;
        if (!q) {
            doctors = await userModel.find({ isDoctor: true });
        } else {
            const regex = new RegExp(q, 'i');
            doctors = await userModel.find({ isDoctor: true, specialization: { $regex: regex } });
        }
        res.status(200).send({ success: true, message: 'Search results', data: doctors });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error while searching doctors' });
    }
};

// Doctor Login Controller
const doctorLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await userModel.findOne({ email, isDoctor: true });
        if (!doctor) {
            return res.status(200).send({ message: 'Doctor not found', success: false });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid credentials', success: false });
        }
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({ message: 'Login Success', success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login: ${error.message}`, success: false });
    }
};

// Get Doctor Appointments
const getDoctorAppointmentsController = async (req, res) => {
    try {
        const doctor = await userModel.findOne({ _id: req.body.userId });
        const appointments = await appointmentModel.find({ doctorId: doctor._id }).populate('userId', 'name email phone');
        res.status(200).send({ success: true, message: 'Doctor appointments fetched successfully', data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error in fetching doctor appointments' });
    }
};

// Update Appointment Status
const updateAppointmentStatusController = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;
        const appointment = await appointmentModel.findByIdAndUpdate(appointmentId, { status }, { new: true });
        res.status(200).send({ success: true, message: 'Appointment status updated successfully', data: appointment });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error in updating appointment status' });
    }
};

module.exports = { 
    getDoctorInfoController, 
    updateProfileController, 
    getDoctorByIdController, 
    getAllDoctorsController, 
    searchDoctorsController,
    doctorLoginController,
    getDoctorAppointmentsController,
    updateAppointmentStatusController
};
