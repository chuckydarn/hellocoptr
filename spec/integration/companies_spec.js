const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/admin/company/";
const Company = require("../../src/db/models").Company;
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : companies", () => {
  beforeEach((done) => {
    this.user;
    sequelize.sync({force: true})
    .then((res) => {
      User.create({
        firstName: "Regina",
        lastName: "Phalange",
        email: "user@example.com",
        password: "12345678"
      })
      .then((user) => {
        this.user = user;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });
  });

  // describe("POST /admin/company/create", () => {
  //   it("should create a new company", (done) => {
  //     const options = {
  //       url: `${base}create`,
  //       form: {
  //         name: "Bacon"
  //       }
  //     };
  //     request.post(options,
  //       (err, res, body) => {
  //         Company.findOne({where: {name: "Bacon"}})
  //         .then((company) => {
  //           expect(company).not.toBeNull();
  //           expect(company.name).toBe("Bacon");
  //           done();
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           done();
  //         });
  //       }
  //     );
  //   });
  // });
});
