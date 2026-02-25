const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salary.controller");


router.post("/", salaryController.createSalary);
router.put("/:id", salaryController.updateSalary);

router.get("/", salaryController.getAllSalaries);
router.get("/:id", salaryController.getSalaryById);
router.delete("/:id", salaryController.deleteSalary);

module.exports = router;