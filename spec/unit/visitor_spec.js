const sequelize = require('../../src/db/models/index').sequelize;
const Company = require('../../src/db/models').Company;
const Employee = require('../../src/db/models').Employee;
const Visitor = require('../../src/db/models').Visitor;

describe("Visitor", () => {
  beforeEach((done) => {
    this.company;
    this.employee;
    sequelize.sync({force: true})
    .then((res) => {
      Company.create({
        name: "Neato Burrito",
        createdBy: 1
      })
      .then((company) => {
        this.company = company;
        Employee.create({
          firstName: "Hermione",
          lastName: "Granger",
          email: "hermione@test.com",
          companyId: this.company.id
        })
        .then((employee) => {
          this.employee = employee;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("#create()", () => {
    it("should create a Visitor", (done) => {
      Visitor.create({
        firstName: "Viktor",
        lastName: "Krum",
        company: "Durmstrung",
        email: "viktor@test.com",
        phone: "555-555-5555",
        companyId: this.company.id,
        employeeId: this.employee.id
      })
      .then((visitor) => {
        expect(visitor.firstName).toBe("Viktor");
        expect(visitor.lastName).toBe("Krum");
        expect(visitor.email).toBe("viktor@test.com");
        expect(visitor.companyId).toBe(this.company.id);
        expect(visitor.employeeId).toBe(this.employee.id);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create an employee with any missing attributes", (done) => {
      Visitor.create({
        firstName: "Viktor"
      })
      .then((visitor) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("cannot be null");
        done();
      });
    });
  });
});
