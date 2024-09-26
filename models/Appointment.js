const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        date: { type: Date, required: true },
        attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        attachments: [String], // For document scanning
    },
    { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
