const express = require("express");
const router = express.Router();
const controller = require("../controllers/employee.controller");
const { validateEmployee } = require("../middleware/validation.middleware");

router.post("/", validateEmployee, controller.createEmployee);
router.get("/", controller.getAllEmployees);
router.get("/:id", controller.getEmployeeById);
router.put("/:id", controller.updateEmployee);
router.delete("/:id", controller.deleteEmployee);

module.exports = router;