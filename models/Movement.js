const mongoose = require("mongoose");

const movementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    department: String,
    note: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Movement", movementSchema);
