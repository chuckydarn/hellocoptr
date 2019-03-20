const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;
const Company = require('../../src/db/models').Company;

describe("User", () => {
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
    it("should create a User", (done) => {
      User.create({
        firstName: "Regina",
        lastName: "Phalange",
        email: "user@example.com",
        password: "12345678"
      })
      .then((user) => {
        expect(user.firstName).toBe("Regina");
        expect(user.lastName).toBe("Phalange");
        expect(user.email).toBe("user@example.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a user with invalid email or password", (done) => {
      User.create({
        firstName: "Regina",
        lastName: "Phalange",
        email: "It's-a me, Mario!",
        password: "12345678"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

    it("should not create a user with an email already taken", (done) => {
      User.create({
        firstName: "Regina",
        lastName: "Phalange",
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {

        User.create({
          firstName: "Phoebe",
          lastName: "Buffay",
          email: "user@example.com",
          password: "iluvmike"
        })
        .then((user) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          done();
        });
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
});
