const express = require("express");
const router = express.Router();
const leaveRequestController = require("../controllers/leaveRequest.controller");

// CREATE
router.post("/", leaveRequestController.addLeave);

// READ ALL
router.get("/", leaveRequestController.getAllLeaves);

// READ BY ID
router.get("/:id", leaveRequestController.getLeaveById);

// UPDATE
router.put("/:id", leaveRequestController.updateLeave);

// DELETE
router.delete("/:id", leaveRequestController.deleteLeave);

// READ BY EMPLOYEE ID
router.get("/employee/:empId", leaveRequestController.getLeaveByEmpId);

module.exports = router;