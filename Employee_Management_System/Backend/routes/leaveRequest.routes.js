const express = require("express");
const router = express.Router();
const leaveRequestController = require("../controllers/leaveRequest.controller");

router.post("/", leaveRequestController.createLeaveRequest);
router.get("/", leaveRequestController.getAllLeaveRequests);
router.get("/:id", leaveRequestController.getLeaveRequestById);
router.put("/:id", leaveRequestController.updateLeaveRequest);
router.delete("/:id", leaveRequestController.deleteLeaveRequest);

module.exports = router;