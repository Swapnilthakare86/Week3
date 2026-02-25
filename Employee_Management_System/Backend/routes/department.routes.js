const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");

const {createDepartmentValidation,updateDepartmentValidation} = require("../middleware/validation/department.validation");

const { validate } = require("../middleware/validate");

router.post("/", createDepartmentValidation, validate, departmentController.createDepartment);
router.put("/:id", updateDepartmentValidation, validate, departmentController.updateDepartment);

router.get("/", departmentController.getAllDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;