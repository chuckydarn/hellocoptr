const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/admin/employees/";
const Employee = require("../../src/db/models").Employee;
const User = require("../../src/db/models").User;
const Company = require("../../src/db/models").Company;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : employees", () => {
  beforeEach((done) => {
    this.user;
    this.company;
    sequelize.sync({force: true})
    .then((res) => {
      User.create({
        firstName: "Harry",
        lastName: "Potter",
        email: "harry@example.com",
        password: "12345678"
      })
      .then((user) => {
        this.user = user;
        Company.create({
          name: "Hogwarts",
          createdBy: this.user.id
        })
        .then((company) => {
          this.company = company;
          User.update({
            companyId: this.company.id
          }, {
            where: {
              id: this.company.createdBy
            }
          })
          .then((company) => {
            this.user.companyId = company[0];
            User.findOne({where: {email: "harry@example.com"}})
            .then((user) => {
              this.user = user;
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          });
        });
      });
    });
  });

  describe("GET /admin/employees/new", () => {
    it("should render a view with a new employee form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Add New Employee");
        done();
      });
    });
  });

  describe("POST /admin/employees/create", () => {
    beforeEach((done) => {
      User.create({
        firstName: "Ron",
        lastName: "Weasley",
        email: "ron@example.com",
        password: "12345678"
      })
      .then((user) => {
        this.user = user;
        request.get({
          url: "http://localhost:3000/auth/fake",
          form: {
            email: "ron@test.com",
            userId: this.user.id
          }
        });
        done();
      });
    });


    // it("should create a new employee with valid values and redirect", (done) => {
    //   const options = {
    //     url: `${base}create`,
    //     form: {
    //       firstName: "Hermione",
    //       lastName: "Granger",
    //       email: "hermione@example.com"
    //     }
    //   }
    //   request.post(options,
    //     (err, res, body) => {
    //       Employee.findOne({where: {email: "hermione@example.com"}})
    //       .then((employee) => {
    //         expect(employee).not.toBeNull();
    //         expect(employee.firstName).toBe("Hermione");
    //         expect(employee.email).toBe("hermione@example.com");
    //         expect(employee.id).toBe(1);
    //         done();
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         done();
    //       });
    //     }
    //   );
    // });

    it("should not create a new employee with invalid attributes and redirect", (done) => {
      request.post(
        {
          url: `${base}create`,
          form: {
            firstName: "Hermione",
            email: "no"
          }
        },
        (err, res, body) => {
          Employee.findOne({where: {email: "no"}})
          .then((employee) => {
            expect(employee).toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("GET /admin/employees/:id", () => {
     it("should render a view with the selected employee", (done) => {
       request.get(`${base}${this.employee.id}`, (err, res, body) => {
         expect(err).toBeNull();
         done();
       });
     });

   });
});
