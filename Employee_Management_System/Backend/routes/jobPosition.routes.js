const express = require("express");
const router = express.Router();
const jobPositionController = require("../controllers/jobPosition.controller");

const {
  createJobPositionValidation,
  updateJobPositionValidation
} = require("../middleware/validation/jobPosition.validation");

const { validate } = require("../middleware/validate");

router.post("/", createJobPositionValidation, validate, jobPositionController.createJobPosition);
router.put("/:id", updateJobPositionValidation, validate, jobPositionController.updateJobPosition);

router.get("/", jobPositionController.getAllJobPositions);
router.get("/:id", jobPositionController.getJobPositionById);
router.delete("/:id", jobPositionController.deleteJobPosition);

module.exports = router;