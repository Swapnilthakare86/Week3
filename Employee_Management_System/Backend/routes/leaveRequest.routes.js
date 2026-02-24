const express = require("express");
const router = express.Router();

const leaveRequestController = require("../controllers/leaveRequest.controller");
const { validateLeaveRequest } = require("../middleware/validation.middleware");

router.post("/", validateLeaveRequest, leaveRequestController.createLeave);
router.put("/:id", validateLeaveRequest, leaveRequestController.updateLeave);

router.get("/", leaveRequestController.getAllLeaves);
router.get("/:id", leaveRequestController.getLeaveById);
router.delete("/:id", leaveRequestController.deleteLeave);
router.get("/employee/:empId", leaveRequestController.getLeavesByEmployeeId);

module.exports = router;