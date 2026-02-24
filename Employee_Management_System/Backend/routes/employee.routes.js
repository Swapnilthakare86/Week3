const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");
const { validateEmployee } = require("../middleware/validation.middleware");

router.post("/", validateEmployee, employeeController.createEmployee);
router.put("/:id", validateEmployee, employeeController.updateEmployee);

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;