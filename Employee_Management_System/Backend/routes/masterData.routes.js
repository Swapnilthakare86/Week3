const express = require("express");
const router = express.Router();
const masterDataController = require("../controllers/masterData.controller");

const {
  getMasterDataByIdValidation,
  getByCategoryValidation
} = require("../middleware/validation/masterData.validation");

const { validate } = require("../middleware/validate");

router.get("/", masterDataController.getAllMasterData);

router.get(
  "/categories",
  masterDataController.getOnlyCategories
);

router.get(
  "/category/:category",
  getByCategoryValidation,
  validate,
  masterDataController.getMasterDataByCategory
);

router.get(
  "/:id",
  getMasterDataByIdValidation,
  validate,
  masterDataController.getMasterDataById
);

module.exports = router;