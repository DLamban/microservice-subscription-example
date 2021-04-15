const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../src/server");

chai.use(chaiHttp);
chai.should();


// function authenticateUser() {
//   return new Promise((resolve, reject) => {

//     request(app)
//       .get('/api/getAdminToken')
//       .end((err, res) => {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(res.body.token);
//       });
//   });
// }

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
  it("it should return a token", done => {
    chai
    // .request(app)
    // .get("/api/getAdminToken")
    // .end((err, res) => {

    .request(app)
      .get('/api/getAdminToken')
      .end((err, res) => {
        if (err) {
          done();//return reject(err);
        }
        chai.request(app)
          .get('api/getAllSubscriptions')
          .end((err, res) => {
            done()
          });
        //})
        // res.should.have.status(200);
        // res.should.to.be.json;
        // console.log(res.body)
      });
  });
});

describe("API /api/getAdminToken", () => {
  it("it should return a token", done => {
    chai
      .request(app)
      .get("/api/getAdminToken")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.json;
        console.log(res.body)
        done();
      });
  });
});