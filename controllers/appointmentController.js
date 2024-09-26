const Appointment = require("../models/Appointment");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Create appointment
exports.createAppointment = async (req, res) => {
    const { title, description, date, attendees } = req.body;
    try {
        const appointment = await Appointment.create({
            title,
            description,
            date,
            attendees,
            createdBy: req.user.id,
        });

        // Send email notifications to attendees
        const attendeeEmails = await User.find({
            _id: { $in: attendees },
        }).select("email");
        attendeeEmails.forEach((attendee) => {
            sendEmail(
                attendee.email,
                "New Appointment",
                `You have an appointment: ${title}`
            );
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Error creating appointment", error });
    }
};

// Fetch appointments
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate(
            "attendees createdBy"
        );
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error });
    }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment)
            return res.status(404).json({ message: "Appointment not found" });

        appointment.status = status;
        await appointment.save();
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Error updating appointment", error });
    }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Appointment deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting appointment", error });
    }
};
