const appointmentModel = require('../models/appointmentModel');
const userModel = require('../models/userModel');

const bookAppointmentController = async (req, res) => {
    try {
        req.body.status = 'pending';
        req.body.date = req.body.date; // expecting 'YYYY-MM-DD'
        req.body.time = req.body.time; // expecting 'HH:MM'

        // Validate date and time are not in the past
        if (!req.body.date) {
            return res.status(400).send({ success: false, message: 'Date is required' });
        }
        if (!req.body.time) {
            return res.status(400).send({ success: false, message: 'Time is required' });
        }
        const appointmentDate = new Date(req.body.date);
        if (isNaN(appointmentDate.getTime())) {
            return res.status(400).send({ success: false, message: 'Invalid date format' });
        }
        const now = new Date();
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        appointmentDate.setHours(0, 0, 0, 0);
        if (appointmentDate < todayDate) {
            return res.status(400).send({ success: false, message: 'You selected wrong time or date' });
        }
        // If today, check if time is not in past
        if (appointmentDate.getTime() === todayDate.getTime()) {
            const [hour, minute] = req.body.time.split(':').map(Number);
            const appointmentDateTime = new Date();
            appointmentDateTime.setHours(hour, minute, 0, 0);
            if (appointmentDateTime < now) {
                return res.status(400).send({ success: false, message: 'You selected wrong time or date' });
            }
        }
        
        // Check if doctor is available at selected time
        const userModel = require('../models/userModel');
        const doctor = await userModel.findById(req.body.doctorId);
        if (doctor && doctor.availableSlots) {
            const dayName = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' });
            const daySlots = doctor.availableSlots.find(slot => slot.day === dayName);
            if (!daySlots || !daySlots.timeSlots.includes(req.body.time)) {
                return res.status(400).send({ success: false, message: 'Doctor is not available at this time' });
            }
        }
        // Ensure userId is set from auth middleware
        req.body.userId = req.body.userId;
        
        console.log('Booking appointment with data:', {
            doctorId: req.body.doctorId,
            userId: req.body.userId,
            date: req.body.date,
            time: req.body.time
        });
        
        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save();
        
        console.log('Appointment saved:', {
            _id: newAppointment._id,
            doctorId: newAppointment.doctorId,
            userId: newAppointment.userId
        });
        
        const doctorUserId = req.body.doctorId || (req.body.doctorInfo && req.body.doctorInfo._id);
        if (doctorUserId) {
            const user = await userModel.findOne({ _id: doctorUserId });
            if (user) {
                user.unseenNotifications.push({
                    type: 'new-appointment-request',
                    message: `A new appointment request from ${req.body.userInfo ? req.body.userInfo.name : 'A patient'}`,
                    onClickPath: '/user/appointments',
                });
                await user.save();
            }
        }
        res.status(200).send({ success: true, message: 'Appointment Booked successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error While Booking Appointment' });
    }
};

const checkAvailabilityController = async (req, res) => {
    try {
        const date = req.body.date;
        const doctorId = req.body.doctorId;
        const time = req.body.time;
        // Validate date and time not in past
        if (!date) {
            return res.status(400).send({ success: false, message: 'Date is required' });
        }
        if (!time) {
            return res.status(400).send({ success: false, message: 'Time is required' });
        }
        const checkDate = new Date(date);
        if (isNaN(checkDate.getTime())) {
            return res.status(400).send({ success: false, message: 'Invalid date format' });
        }
        const now = new Date();
        const todayDate = new Date();
        todayDate.setHours(0,0,0,0);
        checkDate.setHours(0,0,0,0);
        if (checkDate < todayDate) {
            return res.status(400).send({ success: false, message: 'You selected wrong time or date' });
        }
        // If today, check if time is not in past
        if (checkDate.getTime() === todayDate.getTime()) {
            const [hour, minute] = time.split(':').map(Number);
            const appointmentDateTime = new Date();
            appointmentDateTime.setHours(hour, minute, 0, 0);
            if (appointmentDateTime < now) {
                return res.status(400).send({ success: false, message: 'You selected wrong time or date' });
            }
        }
        
        // Check if doctor is available at selected time
        const userModel = require('../models/userModel');
        const doctor = await userModel.findById(doctorId);
        if (doctor && doctor.availableSlots) {
            const dayName = checkDate.toLocaleDateString('en-US', { weekday: 'long' });
            const daySlots = doctor.availableSlots.find(slot => slot.day === dayName);
            if (!daySlots || !daySlots.timeSlots.includes(time)) {
                return res.status(400).send({ success: false, message: 'Doctor is not available at this time' });
            }
        }
        const appointments = await appointmentModel.find({ doctorId, date, time });
        if (appointments.length > 0) {
            return res.status(200).send({ message: 'Appointments not Available at this time', success: false });
        } else {
            return res.status(200).send({ message: 'Appointments Available', success: true });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error In Checking Availability' });
    }
}

const getAppointmentsByDoctorController = async (req, res) => {
    try {
        const doctorId = req.body.userId;
        console.log('Doctor appointment fetch - doctorId:', doctorId);
        console.log('req.body:', req.body);
        
        const appointments = await appointmentModel.find({ doctorId: doctorId });
        console.log('Found appointments:', appointments.length);
        console.log('Appointments data:', appointments);
        
        res.status(200).send({ success: true, message: 'Doctor Appointments Fetch Successfully', data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error in Doc Appointments' });
    }
}

const updateStatusController = async (req, res) => {
    try {
        const { appointmentId, status, doctorInstructions } = req.body;
        const updateData = { status };
        if (doctorInstructions) {
            updateData.doctorInstructions = doctorInstructions;
        }
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentId, updateData);
        const user = await userModel.findOne({ _id: appointments.userId });
        user.unseenNotifications.push({
            type: 'status-updated',
            message: `Your appointment has been ${status}`,
            onClickPath: '/doctor-appointments',
        });
        await user.save();
        res.status(200).send({ success: true, message: 'Appointment Status Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error In Update Status' });
    }
}

const getAppointmentsByUserIdController = async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log('User appointment fetch - userId:', userId);
        console.log('req.body:', req.body);
        
        const appointments = await appointmentModel.find({ userId: userId });
        console.log('Found user appointments:', appointments.length);
        console.log('Appointments data:', appointments);
        
        res.status(200).send({ success: true, message: 'User Appointments Fetch Successfully', data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error in User Appointments' });
    }
}
const cancelAppointmentController = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res.status(400).send({
                success: false,
                message: "appointmentId is required"
            });
        }

        // Update appointment status
        const appointment = await appointmentModel.findByIdAndUpdate(
            appointmentId,
            { status: "cancelled" },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).send({
                success: false,
                message: "Appointment not found"
            });
        }

        // doctorId must exist in appointment model
        const doctorUserId = appointment.doctorId;
        
        // 🔒 Prevent crash if doctorId missing
        if (doctorUserId) {
            const doctor = await userModel.findById(doctorUserId);

            if (doctor) {
                doctor.unseenNotifications.push({
                    type: "appointment-cancelled",
                    message: `A patient cancelled their appointment`,
                    onClickPath: "/doctor-appointments"
                });

                await doctor.save();
            }
        }

        return res.status(200).send({
            success: true,
            message: "Appointment cancelled successfully",
            data: appointment
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error cancelling appointment",
            error
        });
    }
};


module.exports = { bookAppointmentController, checkAvailabilityController, getAppointmentsByDoctorController, updateStatusController, getAppointmentsByUserIdController, cancelAppointmentController };
