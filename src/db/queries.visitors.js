const Company = require("./models").Company;
const Visitor = require("./models").Visitor;

module.exports = {
  getAllVisitors(id, callback) {
    Company.findById(id, {
      include: [{
        model: Visitor,
        as: "visitors"
      }]
    })
    .then((company) => {
      var visitors = company.visitors;
      return visitors;
    })
    .then((visitors) => {
      callback(null, visitors)
    })
    .catch((err) => {
      callback(err);
    })
  },

  addVisitor(newVisitor, callback) {
    return Visitor.create(newVisitor)
    .then((visitor) => {
      callback(null, visitor);
    })
    .catch((err) => {
      callback(err);
    })
  },
}
