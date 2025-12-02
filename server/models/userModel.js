const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },

    // Doctor Specific Fields
    specialization: { type: String },
    experience: { type: Number },
    fees: { type: Number },
    about: { type: String },
    location: { type: String },        // Doctor location
    qualifications: { type: String },  // Doctor qualifications

    phone: { type: String },           // ✅ Add
    timings: { type: Object },         // ✅ Add
    image: { type: String },           // Doctor image URL

    seenNotifications: {
        type: Array,
        default: [],
    },
    unseenNotifications: {
        type: Array,
        default: [],
    },
   about: {
    type: String,
    default: "",
},


}, {
    timestamps: true,
});

module.exports = mongoose.model('users', userSchema);
