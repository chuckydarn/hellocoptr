const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitorController");

router.get("/admin/visitors", visitorController.index);
router.get("/checkin/form", visitorController.new);
router.post("/checkin/visitors/create", visitorController.create);
router.get("/checkin/welcome", visitorController.welcome);
router.get("/checkin/success", visitorController.success);

module.exports = router;
