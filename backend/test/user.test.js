import request from "supertest";
import { describe, it } from "mocha";
import app from "../index.js";
import { expect } from "chai";
import userService from "../services/userService.js";

describe("User routes", () => {
  describe("GET /users", () => {
    it("should fetch users", async () => {
      const resp = await request(app).get("/users").expect(200);

      console.log(resp.body);
      expect(resp.body.length > 0).to.be.true;
      expect(Object.keys(resp.body[0])).to.deep.equal([
        "_id",
        "userName",
        "firstName",
        "lastName",
        "email",
        "password",
        "__v",
      ]);
    });
  });

  describe("POST /signup/", async () => {
    it("should create a user and return user jwt", async () => {
      const resp = await request(app)
        .post("/users/signup")
        .send({
          userName: "testUser-4",
          firstName: "tester",
          lastName: "smith",
          email: "test@gmail.com",
          password: "12345680",
        })
        .expect(200);

      console.log(resp.body);
      expect(resp.body.token !== undefined).to.be.true;
    });
  });

  describe("POST /login/", async () => {
    const userData = {
      userName: "testUser-9",
      firstName: "Neil",
      lastName: "Smith",
      email: "Neil@gmail.com",
      password: "2223334",
    };

    before(async () => {
      await userService.createUser(
        userData.userName,
        userData.firstName,
        userData.lastName,
        userData.email,
        await userService.getPasswordHash(userData.password, 5),
      );
    });

    it("should login a user and return user jwt", async () => {
      const resp = await request(app)
        .post("/users/login")
        .send({
          userName: userData.userName,
          password: userData.password,
        })
        .expect(200);

      console.log(resp.body);
      expect(resp.body.token !== undefined).to.be.true;
    });
  });
});
