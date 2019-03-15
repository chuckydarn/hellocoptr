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
           console.log('user created');
           req.flash("notice", "You've successfully signed in!");
           res.redirect("/admin/dashboard");
         })
       }
     });
   }
}
