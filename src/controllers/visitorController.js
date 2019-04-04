const visitorQueries = require("../db/queries.visitors.js");
const employeeQueries = require("../db/queries.employees.js");
const companyQueries = require("../db/queries.companies.js");
const Employee = require("../db/models").Employee;
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  index(req, res, next) {
    if(!req.user) {
      res.redirect("/admin/users/sign_in");
    }
    visitorQueries.getAllVisitors(req.user.companyId, (err, visitors) => {
      if(err){
        res.redirect("/admin");
      } else {
        res.render("admin/visitors/show", {visitors});
      }
    })
  },

  new(req, res, next) {
    if(!req.user) {
      res.redirect("/admin/users/sign_in");
    }
    employeeQueries.getAllEmployees(req.user.companyId, (err, employees) => {
      if(err){
        res.redirect(404, "/");
      } else {
        res.render("checkin/checkin", {employees});
      }
    })
  },

  create(req, res, next) {
    let newVisitor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      email: req.body.email,
      phone: req.body.phone,
      employeeId: req.body.employeeId,
      companyId: req.user.companyId
    };

    Employee.findById(req.body.employeeId)
    .then((employee) => {
      const msg = {
        to: employee.email,
        from: 'notifications@hellocoptr.com',
        subject: 'Your guest has arrived!',
        html: `<p>Hi ${req.body.employee},<br> ${req.body.firstName} ${req.body.lastName} is here to see you.</p>`
      };

      visitorQueries.addVisitor(newVisitor, (err, visitor) => {
        if(err) {
          res.redirect(500, "/checkin/form");
        } else {
          sgMail.send(msg)
          .then(() => {
            res.redirect(303, "/checkin/success");
          })
          .catch((err) => {
            console.log(err);
          });
          res.redirect(303, "/checkin/success");
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
  },

  welcome(req, res, next) {
    if(!req.user) {
      res.redirect("/admin/users/sign_in");
    }
    companyQueries.getCompany(req.user.companyId, (err, company) => {
      if(err || company == null) {
        res.redirect(404, "/admin");
      } else {
        res.render("checkin/welcome", {company});
      }
    });
  },

  success(req, res, next) {
    if(!req.user) {
      res.redirect("/admin/users/sign_in");
    }
    res.render("checkin/success");
  }
}
