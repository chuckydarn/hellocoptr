const Company = require("./models").Company;

module.exports = {
  addCompany(newCompany, callback) {
    return Company.create({
      name: newCompany.name,
      createdBy: newCompany.createdBy
    })
    .then((company) => {
      callback(null, company);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getCompany(id, callback) {
    return Company.findById(id)
    .then((company) => {
      callback(null, company);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateCompany(id, updatedCompany, callback) {
    return Company.findById(id)
    .then((company) => {
      if(!company) {
        return callback("Company not found");
      }

      company.update(updatedCompany, {
        fields: Object.keys(updatedCompany)
      })
      .then(() => {
        callback(null, company);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}
