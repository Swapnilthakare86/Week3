const express = require("express");
const router = express.Router();
const masterDataController = require("../controllers/masterData.controller");

router.get("/", masterDataController.getAllMasterData);
router.get("/categories", masterDataController.getOnlyCategories);
router.get("/category/:category", masterDataController.getMasterDataByCategory);
router.get("/:id", masterDataController.getMasterDataById);

module.exports = router;