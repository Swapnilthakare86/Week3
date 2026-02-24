const express = require("express");
const router = express.Router();
const jobPositionController = require("../controllers/jobPosition.controller");

router.post("/", jobPositionController.createJobPosition);
router.get("/", jobPositionController.getAllJobPositions);
router.get("/:id", jobPositionController.getJobPositionById);
router.put("/:id", jobPositionController.updateJobPosition);
router.delete("/:id", jobPositionController.deleteJobPosition);

module.exports = router;