const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");

const {createCompanyValidation,updateCompanyValidation} = require("../middleware/validation/company.validation");

const { validate } = require("../middleware/validate");

router.post("/", createCompanyValidation, validate, companyController.createCompany);
router.put("/:id", updateCompanyValidation, validate, companyController.updateCompany);

router.get("/", companyController.getAllCompanies);
router.get("/:id", companyController.getCompanyById);
router.delete("/:id", companyController.deleteCompany);

module.exports = router;