const Company = require("./models").Company;
const Employee = require("./models").Employee;
const Visitor = require("./models").Visitor;

module.exports = {
  getAllEmployees(id, callback) {
    Company.findById(id, {
      include: [{
        model: Employee,
        as: "employees"
      }]
    })
    .then((company) => {
      var employees = company.employees;
      employees.sort(function(a, b) {
        var nameA = a.lastName;
        var nameB = b.lastName;
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
      });
      return employees;
    })
    .then((employees) => {
      callback(null, employees)
    })
    .catch((err) => {
      callback(err);
    })
  },

  addEmployee(newEmployee, callback) {
    return Employee.create(newEmployee)
    .then((employee) => {
      callback(null, employee);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getEmployee(id, callback) {
    return Employee.findById(id, {
      include: [{
        model: Visitor,
        as: "visitors"
      }]
    })
    .then((employee) => {
      console.log(employee);
      callback(null, employee);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteEmployee(id, callback) {
    return Employee.destroy({
      where: {id}
    })
    .then((deletedRecordsCount) => {
      callback(null, deletedRecordsCount);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateEmployee(id, updatedEmployee, callback) {
    return Employee.findById(id)
    .then((employee) => {
      if(!employee) {
        return callback("Employee not found");
      }

      employee.update(updatedEmployee, {
        fields: Object.keys(updatedEmployee)
      })
      .then((employee) => {
        callback(null, employee);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}
