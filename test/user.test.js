import assert from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";

chai.should();
chai.use(chaiHttp);

describe("User-Auth API", () => {
    this.timeout(10000)
  describe("Creating a user", () => {

    it("successful creation of a user", (done) => {
      const user = {
        email: "something@somthing1.com",
        password: "Turbo@1234",
        first_name: "aditya",
        last_name: "prakash",
        ph_no: 1234567890,
        address: "somewhere",
        city: "Pune",
        state: "MH",
        zip_code: 40012092,
        date_of_birth: new Date(),
        gender: "male",
      };
      chai
        .request(app)
        .post("/auth/register")
        .send(user)
        .end((err, response) => {
          //console.log(response.body);
          response.body.should.be.a("object");
          response.body.should.have.property("accessToken");
          response.body.should.have.property("refreshToken");
          done();
        });
    });

    it("error in create a user", (done) => {
      const user = {
        email: "something@something.com",
      };
      chai
        .request(app)
        .post("/auth/register")
        .send(user)
        .end((err, response) => {
          response.should.have.status(422);
          response.body.should.be.a("object");
          response.body.should.have.property("error");
          response.body.error.should.have.property("status").eq(422);
          response.body.error.should.have.property("message");
          response.body.error.message.should.have.property("password");
          response.body.error.message.should.have.property("ph_no");
          done();
        });
    });
  });
});
