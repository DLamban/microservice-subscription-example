const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../src/server");

chai.use(chaiHttp);
chai.should();

describe("API /healthz", () => {
  it("it should return 200", done => {
    chai
      .request(app)
      .get("/healthz")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("API /api/getAdminToken", () => {
  it("it should return an token", done => {
    chai
      .request(app)
      .get("/api/getAdminToken")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.json;        
        res.json.body.token.should.exist;
        done();
      });
  });
});
