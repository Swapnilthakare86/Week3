const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");

const {createAttendanceValidation,updateAttendanceValidation} = require("../middleware/validation/attendance.validation");

const { validate } = require("../middleware/validate");

router.post("/",createAttendanceValidation,validate,attendanceController.createAttendance);

router.put("/:id",updateAttendanceValidation,validate,attendanceController.updateAttendance);

router.get("/", attendanceController.getAllAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;