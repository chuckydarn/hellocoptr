const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
  signUp(req, res, next){
    res.render("admin/users/sign_up");
  },

  create(req, res, next){
    let newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    };

    userQueries.createUser(newUser, (err, user) => {
      if(err){
        req.flash("error", err);
        res.redirect("/admin/users/sign_up");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/admin/dashboard");
        })
      }
    });
  },

  signInForm(req, res, next) {
    res.render("admin/users/sign_in");
  },

  signIn(req, res, next){
    passport.authenticate("local")(req, res, function () {
      if(!req.user || res.statusCode == 401){
        req.flash("notice", "Oh boy, that didn't work. Try again.")
        res.redirect("/admin/users/sign_in");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/admin/dashboard");
      }
    })
  },

  signOut(req, res, next) {
    req.logout();
    req.flash("notice", "Bye!");
    res.redirect("/admin/users/sign_in");
  }
}
