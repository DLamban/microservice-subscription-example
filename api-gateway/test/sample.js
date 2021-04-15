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
describe("API /api/subscribe", () => {
  it("it should fail without auth", done => {
    chai.request(app)
      .post('/api/subscribe')     
      .set('content-type', 'application/json') 
      .send({"email":"example@gmail.com","name":"dani","gender":"male","agreement":1,"newsletterId":2,"birth":"1984-08-12"})
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it("it should require auth and subscribe", done => {
    chai.request(app)
      .get('/api/getGuestToken')
      .end((err, res) => {
        const token = res.body.token;
        if (err) {
          done();
        }
        chai.request(app)
          .post('/api/subscribe')
          .set({ "Authorization": `Bearer ${token}` })
          .set('content-type', 'application/json') 
          .send({"email":"example@gmail.com","name":"dani","gender":"male","agreement":1,"newsletterId":2,"birth":"1984-08-12"})          
          .end((err, res) => {
            res.should.have.status(200);
            res.should.to.be.json;
            done()
          });
      });
  });
});
describe("API /api/getAllSubscriptions", () => {
  it("it should fail without auth", done => {
    chai.request(app)
      .get('/api/getAllSubscriptions')      
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it("it should require auth and admin role ", done => {
    chai.request(app)
      .get('/api/getAdminToken')
      .end((err, res) => {
        const token = res.body.token;
        if (err) {
          done();
        }
        chai.request(app)
          .get('/api/getAllSubscriptions')
          .set({ "Authorization": `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.should.to.be.json;
            done()
          });
      });
  });
});
