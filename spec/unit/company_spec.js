const sequelize = require('../../src/db/models/index').sequelize;
const Company = require('../../src/db/models').Company;

describe("Company", () => {
  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe("#create()", () => {
    it("should create a Company", (done) => {
      Company.create({
        name: "The Company",
        createdBy: 1
      })
      .then((company) => {
        expect(company.name).toBe("The Company");
        expect(company.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
});
