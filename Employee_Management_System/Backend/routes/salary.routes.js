const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salary.controller");

router.post("/", salaryController.createSalary);
router.get("/", salaryController.getAllSalaries);
router.get("/:id", salaryController.getSalaryById);
router.get("/employee/:employee_id", salaryController.getSalaryByEmployeeId);
router.put("/:id", salaryController.updateSalary);
router.delete("/:id", salaryController.deleteSalary);

module.exports = router;