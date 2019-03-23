const employeeQueries = require("../db/queries.employees.js");

module.exports = {
  index(req, res, next) {
    employeeQueries.getAllEmployees(req.user.companyId, (err, employees) => {
      if(err){
        res.redirect(404, "/admin");
      } else {
        res.render("admin/employees/show_all", {employees})
      }
    })
  },

  new(req, res, next) {
    res.render("admin/employees/new");
  },

  create(req, res, next) {
    let newEmployee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      companyId: req.user.companyId
    };

    employeeQueries.addEmployee(newEmployee, (err, employee) => {
      if(err) {
        res.redirect(500, "/admin/employees/new");
      } else {
        res.redirect(303, `/admin/employees/${employee.id}`);
      }
    });
  },

  show(req, res, next) {
    employeeQueries.getEmployee(req.params.id, (err, employee) => {
      if(err || employee == null) {
        res.redirect(404, "/admin");
      } else {
        res.render("admin/employees/show_one", {employee});
      }
    });
  },

  destroy(req, res, next) {
    employeeQueries.deleteEmployee(req.params.id, (err, deletedRecordsCount) => {
      if(err) {
        res.redirect(500, `/admin/employees/${req.params.id}`);
      } else {
        res.redirect(303, "/admin/employees");
      }
    });
  },

  edit(req, res, next) {
    employeeQueries.getEmployee(req.params.id, (err, employee) => {
      if(err || employee == null) {
        res.redirect(404, "/admin/employees");
      } else {
        res.render("admin/employees/edit", {employee});
      }
    });
  },

  update(req, res, next) {
    employeeQueries.updateEmployee(req.params.id, req.body, (err, employee) => {
      if(err || employee == null) {
        res.redirect(404, "/admin/employees");
      } else {
        res.redirect(`/admin/employees/${req.params.id}`)
      }
    });
  }
}
