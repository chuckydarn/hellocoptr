const request = require('request');
const server = require('../../src/server');
const base = "http://localhost:3000/";

describe("routes : static", () => {
  describe("GET /", () => {
    it("should return a status code of 200 and contain hellocoptr", (done) => {
      request.get(base, (req, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("hellocoptr");
        done();
      });
    });
  });
});
