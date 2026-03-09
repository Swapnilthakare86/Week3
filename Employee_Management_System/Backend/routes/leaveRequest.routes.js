const express = require("express");
const router = express.Router();
const leaveRequestController = require("../controllers/leaveRequest.controller");

// CREATE
router.post("/", leaveRequestController.addLeave);

// READ ALL
router.get("/", leaveRequestController.getAllLeaves);

// READ BY ID
router.get("/:id", leaveRequestController.getLeaveById);

// UPDATE FULL LEAVE
router.put("/:id", leaveRequestController.updateLeave);

// UPDATE STATUS ONLY
router.put("/status/:id", leaveRequestController.updateLeaveStatus); // ✅ no parentheses

// DELETE
router.delete("/:id", leaveRequestController.deleteLeave);

// READ BY EMPLOYEE ID
router.get("/employee/:empId", leaveRequestController.getLeaveByEmpId);

module.exports = router;