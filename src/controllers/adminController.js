module.exports = {
  index(req, res, next) {
    if(!res.user) {
      res.redirect("/admin/users/sign_in");
    } else {
      res.render("admin/dashboard");
    }
  }
}
