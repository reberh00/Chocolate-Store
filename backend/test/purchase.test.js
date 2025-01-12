import request from "supertest";
import { describe, it } from "mocha";
import app from "../index.js";
import { expect } from "chai";
import buyerService from "../services/buyerService.js";
import userService from "../services/userService.js";
import { secret } from "../config.js";
import chocolateService from "../services/chocolateService.js";
import purchaseService from "../services/purchaseService.js";

const userToken = `Bearer ${await userService.createJwtToken("test-user", secret)}`;

describe("Purchase routes", () => {
  describe("GET /purchases", () => {
    it("should fetch purchases", async () => {
      const resp = await request(app).get("/purchases").expect(200);

      console.log(resp.body);
      expect(resp.body.length > 0).to.be.true;
      expect(Object.keys(resp.body[0])).to.deep.equal([
        "_id",
        "buyerId",
        "chocolateId",
        "date",
        // "amount",
        "__v",
      ]);
    });
  });

  describe("GET /purchases/:purchaseId", async () => {
    let createdPurchase;

    before(async () => {
      const createdBuyer = await buyerService.createBuyer(
        "Global Choco Ltd.",
        "123 Cocoa Lane, Choco City, Chocolate Country",
        "A world-renowned chocolate manufacturing firm specializing in premium organic and vegan chocolates.",
        "1995-06-15T00:00:00Z",
        15000000,
        ["United States", "Canada", "Germany", "Japan", "Australia"]
      );

      const createdChocolate = await chocolateService.createChocolate(
        "Dark Chocolate Delight",
        "ChocoFirm Inc.",
        "A rich, smooth dark chocolate with a high cacao percentage, offering a deep and intense flavor with subtle fruity undertones.",
        "2024-11-15",
        4.99,
        100,
        85,
        true,
        true,
        ["Cacao mass", "Cacao butter", "Sugar", "Vanilla", "Lecithin"]
      );

      createdPurchase = await purchaseService.createPurchase(
        createdBuyer._id,
        createdChocolate._id,
        "2024-11-15",
        1500
      );
    });

    it("should fetch the created purchase by id", async () => {
      const resp = await request(app)
        .get(`/purchases/${createdPurchase.id}`)
        .expect(200);

      console.log(resp.body);
      // expect(resp.body.buyerId).to.be.equal(createdPurchase.buyerId);
      // expect(resp.body.buyerId).to.be.equal(createdPurchase.chocolateId);
      expect(resp.body.date).to.be.equal(createdPurchase.date.toISOString());
      expect(resp.body.amount).to.be.equal(createdPurchase.amount);
    });
  });

  // describe("PUT /buyers/:buyerId", async () => {
  //   let createdBuyer;

  //   before(async () => {
  //     createdBuyer = await buyerService.createBuyer(
  //       "Global Choco Ltd.",
  //       "123 Cocoa Lane, Choco City, Chocolate Country",
  //       "A world-renowned chocolate manufacturing firm specializing in premium organic and vegan chocolates.",
  //       "1995-06-15T00:00:00Z",
  //       15000000,
  //       ["United States", "Canada", "Germany", "Japan", "Australia"]
  //     );
  //   });

  //   it("should update the created buyers by id", async () => {
  //     const newFirmName = "Global Milk Ltd.";
  //     const resp = await request(app)
  //       .put(`/buyers/${createdBuyer.id}`)
  //       .set("Authorization", userToken)
  //       .send({
  //         firmName: newFirmName,
  //         firmAddress: createdBuyer.firmAddress,
  //         description: createdBuyer.description,
  //         dateEstablished: createdBuyer.dateEstablished,
  //         netWorth: createdBuyer.netWorth,
  //         countriesOfInterest: createdBuyer.countriesOfInterest,
  //       })
  //       .expect(200);

  //     console.log(resp.body);
  //     expect(resp.body.firmName).to.be.equal(newFirmName);
  //     expect(resp.body.firmAddress).to.be.equal(createdBuyer.firmAddress);
  //     expect(resp.body.description).to.be.equal(createdBuyer.description);
  //     expect(resp.body.dateEstablished).to.be.equal(
  //       createdBuyer.dateEstablished.toISOString()
  //     );
  //     expect(resp.body.netWorth).to.be.equal(createdBuyer.netWorth);
  //     expect(resp.body.countriesOfInterest).to.have.all.members(
  //       createdBuyer.countriesOfInterest
  //     );
  //   });
  // });

  // describe("POST /buyers/", async () => {
  //   it("should create a chocolate", async () => {
  //     const buyerData = {
  //       firmName: "Global Choco Ltd.",
  //       firmAddress: "123 Cocoa Lane, Choco City, Chocolate Country",
  //       description:
  //         "A world-renowned chocolate manufacturing firm specializing in premium organic and vegan chocolates.",
  //       dateEstablished: "1995-06-15T00:00:00.000Z",
  //       netWorth: 15000000,
  //       countriesOfInterest: [
  //         "United States",
  //         "Canada",
  //         "Germany",
  //         "Japan",
  //         "Australia",
  //       ],
  //     };
  //     const resp = await request(app)
  //       .post("/buyers")
  //       .set("Authorization", userToken)
  //       .send({
  //         ...buyerData,
  //       })
  //       .expect(200);

  //     console.log(resp.body);
  //     expect(resp.body.firmName).to.be.equal(buyerData.firmName);
  //     expect(resp.body.firmAddress).to.be.equal(buyerData.firmAddress);
  //     expect(resp.body.description).to.be.equal(buyerData.description);
  //     expect(resp.body.dateEstablished).to.be.equal(buyerData.dateEstablished);
  //     expect(resp.body.netWorth).to.be.equal(buyerData.netWorth);
  //     expect(resp.body.countriesOfInterest).to.have.all.members(
  //       buyerData.countriesOfInterest
  //     );
  //   });
  // });

  // describe("DELETE /buyers/:buyerId", async () => {
  //   let createdBuyer;

  //   before(async () => {
  //     createdBuyer = await buyerService.createBuyer(
  //       "Global Choco Ltd.",
  //       "123 Cocoa Lane, Choco City, Chocolate Country",
  //       "A world-renowned chocolate manufacturing firm specializing in premium organic and vegan chocolates.",
  //       "1995-06-15T00:00:00Z",
  //       15000000,
  //       ["United States", "Canada", "Germany", "Japan", "Australia"]
  //     );
  //   });

  //   it("should delete the created buyer by id", async () => {
  //     const resp = await request(app)
  //       .delete(`/buyers/${createdBuyer.id}`)
  //       .set("Authorization", userToken)
  //       .expect(200);

  //     console.log(resp.body);
  //     expect(resp.body.deletedCount).to.be.equal(1);
  //   });
  // });
});
