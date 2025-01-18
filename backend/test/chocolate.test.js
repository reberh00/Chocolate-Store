import request from "supertest";
import { describe, it } from "mocha";
import app from "../index.js";
import { expect } from "chai";
import chocolateService from "../services/chocolateService.js";
import userService from "../services/userService.js";
import dotenv from "dotenv";
dotenv.config();

const userToken = `Bearer ${await userService.createJwtToken("test-user", process.env.secret)}`;

describe("Chocolate routes", () => {
  describe("GET /chocolates", () => {
    it("should fetch chocolates", async () => {
      const resp = await request(app).get("/chocolates").expect(200);

      // console.log(resp.body);
      expect(resp.body.length > 0).to.be.true;
      expect(Object.keys(resp.body[0])).to.deep.equal([
        "_id",
        "name",
        "firmName",
        "description",
        "dateOfProduction",
        "price",
        "netWeight",
        "cacaoPercentage",
        "isVegan",
        "isOrganic",
        "ingredients",
        "__v",
      ]);
    });
  });

  describe("GET /chocolates/:chocolateId", async () => {
    let createdChocolate;

    before(async () => {
      createdChocolate = await chocolateService.createChocolate(
        "Dark Chocolate Delight",
        "ChocoFirm Inc.",
        "A rich, smooth dark chocolate with a high cacao percentage, offering a deep and intense flavor with subtle fruity undertones.",
        "2024-11-15",
        4.99,
        100,
        85,
        true,
        true,
        ["Cacao mass", "Cacao butter", "Sugar", "Vanilla", "Lecithin"],
      );
    });

    it("should fetch the created chocolates by id", async () => {
      const resp = await request(app)
        .get(`/chocolates/${createdChocolate.id}`)
        .expect(200);

      // console.log(resp.body);
      expect(resp.body.name).to.be.equal(createdChocolate.name);
      expect(resp.body.firmName).to.be.equal(createdChocolate.firmName);
      expect(resp.body.description).to.be.equal(createdChocolate.description);
      expect(resp.body.dateOfProduction).to.be.equal(
        createdChocolate.dateOfProduction.toISOString(),
      );
      expect(resp.body.price).to.be.equal(createdChocolate.price);
      expect(resp.body.netWeight).to.be.equal(createdChocolate.netWeight);
      expect(resp.body.cacaoPercentage).to.be.equal(
        createdChocolate.cacaoPercentage,
      );
      expect(resp.body.isVegan).to.be.equal(createdChocolate.isVegan);
      expect(resp.body.isOrganic).to.be.equal(createdChocolate.isOrganic);
      expect(resp.body.ingredients).to.have.all.members(
        createdChocolate.ingredients,
      );
    });
  });

  describe("PUT /chocolates/:chocolateId", async () => {
    let createdChocolate;

    before(async () => {
      createdChocolate = await chocolateService.createChocolate(
        "Dark Chocolate Delight",
        "ChocoFirm Inc.",
        "A rich, smooth dark chocolate with a high cacao percentage, offering a deep and intense flavor with subtle fruity undertones.",
        "2024-11-15",
        4.99,
        100,
        85,
        true,
        true,
        ["Cacao mass", "Cacao butter", "Sugar", "Vanilla", "Lecithin"],
      );
    });

    it("should update the created chocolates by id", async () => {
      const newChocolateName = "White Chocolate Delight";
      const resp = await request(app)
        .put(`/chocolates/${createdChocolate.id}`)
        .set("Authorization", userToken)
        .send({
          name: newChocolateName,
          firmName: createdChocolate.firmName,
          description: createdChocolate.description,
          dateOfProduction: createdChocolate.dateOfProduction,
          price: createdChocolate.price,
          netWeight: createdChocolate.netWeight,
          cacaoPercentage: createdChocolate.cacaoPercentage,
          isVegan: createdChocolate.isVegan,
          isOrganic: createdChocolate.isOrganic,
          ingredients: createdChocolate.ingredients,
        })
        .expect(200);

      console.log(resp.body);
      expect(resp.body.name).to.be.equal(newChocolateName);
      expect(resp.body.firmName).to.be.equal(createdChocolate.firmName);
      expect(resp.body.description).to.be.equal(createdChocolate.description);
      expect(resp.body.dateOfProduction).to.be.equal(
        createdChocolate.dateOfProduction.toISOString(),
      );
      expect(resp.body.price).to.be.equal(createdChocolate.price);
      expect(resp.body.netWeight).to.be.equal(createdChocolate.netWeight);
      expect(resp.body.cacaoPercentage).to.be.equal(
        createdChocolate.cacaoPercentage,
      );
      expect(resp.body.isVegan).to.be.equal(createdChocolate.isVegan);
      expect(resp.body.isOrganic).to.be.equal(createdChocolate.isOrganic);
      expect(resp.body.ingredients).to.have.all.members(
        createdChocolate.ingredients,
      );
    });
  });

  describe("POST /chocolates/", async () => {
    it("should create a chocolate", async () => {
      const chocolateData = {
        name: "Dark Chocolate Delight",
        firmName: "ChocoFirm Inc.",
        description:
          "A rich, smooth dark chocolate with a high cacao percentage, offering a deep and intense flavor with subtle fruity undertones.",
        dateOfProduction: "2024-11-15T00:00:00.000Z",
        price: 4.99,
        netWeight: 100,
        cacaoPercentage: 85,
        isVegan: true,
        isOrganic: true,
        ingredients: [
          "Cacao mass",
          "Cacao butter",
          "Sugar",
          "Vanilla",
          "Lecithin",
        ],
      };
      const resp = await request(app)
        .post("/chocolates")
        .set("Authorization", userToken)
        .send({
          ...chocolateData,
        })
        .expect(200);

      console.log(resp.body);
      expect(resp.body.name).to.be.equal(chocolateData.name);
      expect(resp.body.firmName).to.be.equal(chocolateData.firmName);
      expect(resp.body.description).to.be.equal(chocolateData.description);
      expect(resp.body.dateOfProduction).to.be.equal(
        chocolateData.dateOfProduction,
      );
      expect(resp.body.price).to.be.equal(chocolateData.price);
      expect(resp.body.netWeight).to.be.equal(chocolateData.netWeight);
      expect(resp.body.cacaoPercentage).to.be.equal(
        chocolateData.cacaoPercentage,
      );
      expect(resp.body.isVegan).to.be.equal(chocolateData.isVegan);
      expect(resp.body.isOrganic).to.be.equal(chocolateData.isOrganic);
      expect(resp.body.ingredients).to.have.all.members(
        chocolateData.ingredients,
      );
    });
  });

  describe("DELETE /chocolates/:chocolateId", async () => {
    let createdChocolate;

    before(async () => {
      createdChocolate = await chocolateService.createChocolate(
        "Dark Chocolate Delight",
        "ChocoFirm Inc.",
        "A rich, smooth dark chocolate with a high cacao percentage, offering a deep and intense flavor with subtle fruity undertones.",
        "2024-11-15",
        4.99,
        100,
        85,
        true,
        true,
        ["Cacao mass", "Cacao butter", "Sugar", "Vanilla", "Lecithin"],
      );
    });

    it("should delete the created chocolates by id", async () => {
      const resp = await request(app)
        .delete(`/chocolates/${createdChocolate.id}`)
        .set("Authorization", userToken)
        .expect(200);

      console.log(resp.body);
      expect(resp.body.deletedCount).to.be.equal(1);
    });
  });
});
