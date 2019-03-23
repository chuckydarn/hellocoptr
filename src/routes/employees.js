const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/admin/employees", employeeController.index);
router.get("/admin/employees/new", employeeController.new);
router.post("/admin/employees/create", employeeController.create);
router.get("/admin/employees/:id", employeeController.show);
router.post("/admin/employees/:id/destroy", employeeController.destroy);
router.get("/admin/employees/:id/edit", employeeController.edit);
router.post("/admin/employees/:id/update", employeeController.update);

module.exports = router;
