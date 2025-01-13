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
        "amount",
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
        ["United States", "Canada", "Germany", "Japan", "Australia"],
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
        ["Cacao mass", "Cacao butter", "Sugar", "Vanilla", "Lecithin"],
      );

      createdPurchase = await purchaseService.createPurchase(
        createdBuyer._id,
        createdChocolate._id,
        "2024-11-15",
        1500,
      );
    });

    it("should fetch the created purchase by id", async () => {
      const resp = await request(app)
        .get(`/purchases/${createdPurchase.id}`)
        .expect(200);

      console.log(resp.body);
      // expect(resp.body.buyerId).to.be.equal(createdPurchase.buyerId.id);
      // expect(resp.body.chocolateId).to.be.equal(createdPurchase.chocolateId.id);
      expect(resp.body.date).to.be.equal(createdPurchase.date.toISOString());
      expect(resp.body.amount).to.be.equal(createdPurchase.amount);
    });
  });

  describe("PUT /purchases/:purchaseId", async () => {
    let createdPurchase;

    before(async () => {
      const createdBuyer = await buyerService.createBuyer(
        "Global Choco Ltd.",
        "123 Cocoa Lane, Choco City, Chocolate Country",
        "A world-renowned chocolate manufacturing firm specializing in premium organic and vegan chocolates.",
        "1995-06-15T00:00:00Z",
        15000000,
        ["United States", "Canada", "Germany", "Japan", "Australia"],
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
        ["Cacao mass", "Cacao butter", "Sugar", "Vanilla", "Lecithin"],
      );

      createdPurchase = await purchaseService.createPurchase(
        createdBuyer._id,
        createdChocolate._id,
        "2024-11-15",
        1500,
      );
    });

    it("should update the created purchase by id", async () => {
      const newAmount = 3000;
      const resp = await request(app)
        .put(`/purchases/${createdPurchase.id}`)
        .set("Authorization", userToken)
        .send({
          buyerId: createdPurchase.buyerId,
          chocolateId: createdPurchase.chocolateId,
          date: createdPurchase.date,
          amount: newAmount,
        })
        .expect(200);

      console.log(resp.body);
      expect(resp.body.amount).to.be.equal(newAmount);
    });
  });

  describe("POST /purchases/", async () => {
    let createdChocolate;
    let createdBuyer;

    before(async () => {
      createdBuyer = await buyerService.createBuyer(
        "Global Choco Ltd.",
        "123 Cocoa Lane, Choco City, Chocolate Country",
        "A world-renowned chocolate manufacturing firm specializing in premium organic and vegan chocolates.",
        "1995-06-15T00:00:00Z",
        15000000,
        ["United States", "Canada", "Germany", "Japan", "Australia"],
      );

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

    it("should create a purchase", async () => {
      const purchaseData = {
        buyerId: createdBuyer.id,
        chocolateId: createdChocolate.id,
        date: "2024-11-13T00:00:00.000Z",
        amount: 4000,
      };

      const resp = await request(app)
        .post("/purchases")
        .set("Authorization", userToken)
        .send({
          ...purchaseData,
        })
        .expect(200);

      console.log(resp.body);
      expect(resp.body.amount).to.be.equal(purchaseData.amount);
      expect(resp.body.date).to.be.equal(purchaseData.date);
    });
  });

  describe("DELETE /purchase/:purchaseId", async () => {
    let createdPurchase;

    before(async () => {
      const createdBuyer = await buyerService.createBuyer(
        "Global Choco Ltd.",
        "123 Cocoa Lane, Choco City, Chocolate Country",
        "A world-renowned chocolate manufacturing firm specializing in premium organic and vegan chocolates.",
        "1995-06-15T00:00:00Z",
        15000000,
        ["United States", "Canada", "Germany", "Japan", "Australia"],
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
        ["Cacao mass", "Cacao butter", "Sugar", "Vanilla", "Lecithin"],
      );

      createdPurchase = await purchaseService.createPurchase(
        createdBuyer._id,
        createdChocolate._id,
        "2024-11-15",
        1500,
      );
    });

    it("should delete the created purchase by id", async () => {
      const resp = await request(app)
        .delete(`/purchases/${createdPurchase.id}`)
        .set("Authorization", userToken)
        .expect(200);

      console.log(resp.body);
      expect(resp.body.deletedCount).to.be.equal(1);
    });
  });
});
