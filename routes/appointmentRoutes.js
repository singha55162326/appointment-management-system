const express = require("express");
const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} = require("../controllers/appointmentController");
const {
  authMiddleware,
  adminMiddleware,
  secretaryMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/appointments", authMiddleware, createAppointment);
router.get("/appointments", authMiddleware, getAppointments);
router.put(
  "/appointments/:id",
  authMiddleware,
  secretaryMiddleware,
  adminMiddleware,
  updateAppointmentStatus
);
router.delete(
  "/appointments/:id",
  authMiddleware,
  adminMiddleware,
  deleteAppointment
);

module.exports = router;
