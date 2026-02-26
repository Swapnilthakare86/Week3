const { body, param } = require("express-validator");
const db = require("../../config/db");

// CREATE ATTENDANCE VALIDATION 

exports.createAttendanceValidation = [
  body("employee_id")
    .notEmpty().withMessage("Employee ID is required")
    .isInt().withMessage("Employee ID must be an integer"),

  body("attendance_date")
    .notEmpty().withMessage("Attendance date is required")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Attendance date must be YYYY-MM-DD"),

  body("check_in")
    .notEmpty().withMessage("Check-in time is required")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Check-in must be in HH:mm format"),

  body("check_out")
    .optional()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Check-out must be in HH:mm format"),

  body("attendance_status_id")
    .notEmpty().withMessage("Attendance status is required")
    .isInt().withMessage("Attendance status must be an integer"),

  body("remarks")
    .optional()
    .isString().withMessage("Remarks must be a string")
];

// UPDATE ATTENDANCE VALIDATION 

exports.updateAttendanceValidation = [
  param("id")
    .isInt().withMessage("Attendance ID must be an integer")
    .custom(async (id) => {
      const [rows] = await db.execute(
        "SELECT attendance_id FROM attendance WHERE attendance_id = ?",
        [id]
      );
      if (!rows.length) {
        throw new Error("Attendance record not found");
      }
      return true;
    }),

  body("employee_id")
    .optional()
    .isInt().withMessage("Employee ID must be an integer"),

  body("attendance_date")
    .optional()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Attendance date must be YYYY-MM-DD"),

  body("check_in")
    .optional()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Check-in must be in HH:mm format"),

  body("check_out")
    .optional()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Check-out must be in HH:mm format"),

  body("attendance_status_id")
    .optional()
    .isInt().withMessage("Attendance status must be an integer"),

  body("remarks")
    .optional()
    .isString().withMessage("Remarks must be a string")
];