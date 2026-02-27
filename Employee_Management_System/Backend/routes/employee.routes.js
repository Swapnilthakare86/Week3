const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");
const { createEmployeeValidation, updateEmployeeValidation } = require("../middleware/validation/employee.validation");
const { validate } = require("../middleware/validate");

router.post("/",createEmployeeValidation,validate,employeeController.createEmployee);

router.put("/:id",updateEmployeeValidation,validate,employeeController.updateEmployee);

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.delete("/:id", employeeController.deleteEmployee);


module.exports = router;