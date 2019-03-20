const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

router.get("/admin/company/sign_up", companyController.signUp);
router.post("/admin/company/create", companyController.create);
router.get("/admin/company/:id", companyController.show);
router.get("/admin/company/:id/edit", companyController.edit);
router.post("/admin/company/:id/update", companyController.update);

module.exports = router;
