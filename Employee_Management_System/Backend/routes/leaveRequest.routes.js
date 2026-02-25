const express = require("express");
const router = express.Router();
const leaveRequestController = require("../controllers/leaveRequest.controller");

const {
  createLeaveRequestValidation,
  updateLeaveRequestValidation
} = require("../middleware/validation/leaveRequest.validation");

const { validate } = require("../middleware/validate");

router.post(
  "/",
  createLeaveRequestValidation,
  validate,
  leaveRequestController.createLeave
);

router.put(
  "/:id",
  updateLeaveRequestValidation,
  validate,
  leaveRequestController.updateLeave
);

router.get("/", leaveRequestController.getAllLeaves);
router.get("/:id", leaveRequestController.getLeaveById);
router.delete("/:id", leaveRequestController.deleteLeave);

module.exports = router;