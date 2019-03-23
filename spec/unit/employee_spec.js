const sequelize = require('../../src/db/models/index').sequelize;
const Company = require('../../src/db/models').Company;
const Employee = require('../../src/db/models').Employee;

describe("Employee", () => {
  beforeEach((done) => {
    this.company;
    sequelize.sync({force: true})
    .then((res) => {
      Company.create({
        name: "Neato Burrito",
        createdBy: 1
      })
      .then((company) => {
        this.company = company;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {
    it("should create an Employee", (done) => {
      Employee.create({
        firstName: "Hermione",
        lastName: "Granger",
        email: "hermione@test.com",
        companyId: this.company.id
      })
      .then((employee) => {
        expect(employee.firstName).toBe("Hermione");
        expect(employee.lastName).toBe("Granger");
        expect(employee.email).toBe("hermione@test.com");
        expect(employee.companyId).toBe(this.company.id);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create an employee with any missing attributes", (done) => {
      Employee.create({
        firstName: "Ron"
      })
      .then((employee) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("cannot be null");
        done();
      });
    });
  });
});
