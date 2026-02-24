const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salary.controller");
const { validateSalary } = require("../middleware/validation.middleware");

router.post("/", validateSalary, salaryController.createSalary);
router.put("/:id", validateSalary, salaryController.updateSalary);

router.get("/", salaryController.getAllSalaries);
router.get("/:id", salaryController.getSalaryById);
router.delete("/:id", salaryController.deleteSalary);

module.exports = router;