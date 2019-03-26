const visitorQueries = require("../db/queries.visitors.js");
const employeeQueries = require("../db/queries.employees.js");
const companyQueries = require("../db/queries.companies.js");
const Employee = require("../db/models").Employee;
const nodemailer = require("nodemailer");

module.exports = {
  index(req, res, next) {
    if(!req.user) {
      res.redirect("/admin/users/sign_in");
    }
    visitorQueries.getAllVisitors(req.user.companyId, (err, visitors) => {
      if(err){
        res.redirect(404, "/admin");
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
      let mailOptions = {
        from: 'notifications@hellocoptr.com',
        to: employee.email,
        subject: 'Your guest has arrived!',
        html: `<p>Hi ${req.body.employee},<br> ${req.body.firstName} ${req.body.lastName} is here to see you.</p>`
      };

      let transporter = nodemailer.createTransport({
        host: 'mail.hellocoptr.com',
        port: 26,
        secure: false,
        auth: {
          user: 'notifications@hellocoptr.com',
          pass: process.env.pwd
        },
        tls: {
          rejectUnauthorized:false
        }
      });

      visitorQueries.addVisitor(newVisitor, (err, visitor) => {
        if(err) {
          res.redirect(500, "/checkin/form");
        } else {
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              res.redirect(500, "/checkin/form");
              console.log(error);
            } else {
              res.redirect(303, "/checkin/success");
            }
          });
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
