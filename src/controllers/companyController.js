const companyQueries = require("../db/queries.companies.js");

module.exports = {
  signUp(req, res, next){
    if(!req.user) {
      res.redirect("/admin/users/sign_in");
    }
    res.render("admin/company/sign_up");
  },

  create(req, res, next) {
    let newCompany = {
      name: req.body.name,
      createdBy: req.user.id
    };
    companyQueries.addCompany(newCompany, (err, company) => {
      if(err) {
        req.flash("error", err);
        res.redirect("/admin/company/sign_up");
      } else {
        res.redirect(303, "/admin");
      }
    })
  },

  show(req, res, next) {
    if(!req.user) {
      res.redirect("/admin/users/sign_in");
    }
    companyQueries.getCompany(req.params.id, (err, company) => {
      if(err || company == null) {
        res.redirect(404, "/admin");
      } else {
        res.render("admin/company/show", {company})
      }
    });
  },

  edit(req, res, next) {
    if(!req.user) {
      res.redirect("/admin/users/sign_in");
    }
    companyQueries.getCompany(req.params.id, (err, company) => {
      if(err || company == null) {
        res.redirect(404, "/admin");
      } else {
        res.render("admin/company/edit", {company})
      }
    });
  },

  update(req, res, next) {
    companyQueries.updateCompany(req.params.id, req.body, (err, company) => {
      if(err || company == null){
         res.redirect(404, `admin/company/${req.params.id}/edit`);
       } else {
         res.redirect(`/admin/company/${company.id}`);
       }
    });
  }
}
