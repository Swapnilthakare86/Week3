const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");
const { validateAttendance } = require("../middleware/validation.middleware");

router.post("/", validateAttendance, attendanceController.createAttendance);
router.put("/:id", validateAttendance, attendanceController.updateAttendance);

router.get("/", attendanceController.getAllAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;