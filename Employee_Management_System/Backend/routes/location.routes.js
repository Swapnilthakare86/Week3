const express = require("express");
const router = express.Router();
const locationController = require("../controllers/location.controller");

const {
  createLocationValidation,
  updateLocationValidation
} = require("../middleware/validation/location.validation");

const { validate } = require("../middleware/validate");

// CREATE
router.post("/",createLocationValidation,validate,locationController.createLocation);

// UPDATE
router.put("/:id",updateLocationValidation,validate,locationController.updateLocation);

//  GET locations by company ID 
router.get("/company/:company_id",locationController.getLocationsByCompanyId);

// READ ALL
router.get("/", locationController.getAllLocations);

// READ BY ID
router.get("/:id", locationController.getLocationById);

// DELETE
router.delete("/:id", locationController.deleteLocation);

module.exports = router;