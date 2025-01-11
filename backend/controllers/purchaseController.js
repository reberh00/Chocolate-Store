import mongoose from "mongoose";
import Purchase from "../models/Purchase.js";
import Buyer from "../models/Buyer.js";
import Chocolate from "../models/Chocolate.js";

const getAllPurchases = async (request, response) => {
  try {
    const purchases = await Purchase.find({});
    return response.json(purchases);
  } catch (error) {
    return response.json(`Error in getting purchases: ${error}`);
  }
};

const getPurchasesById = async (request, response) => {
  const purchaseId = request.params.id;
  try {
    if (!mongoose.isValidObjectId(purchaseId))
      throw new Error("Invalid object id");

    const purchase = await Purchase.find({ _id: purchaseId });
    return response.json(purchase);
  } catch (error) {
    return response.json(`Error in getting purchase with id: ${error}`);
  }
};

const createPurchase = async (request, response) => {
  try {
    const buyerId = request.body.buyerId;
    const chocolateId = request.body.chocolateId;

    const existingBuyerId = await Buyer.find({ _id: buyerId });
    if (existingBuyerId.length == 0) throw new Error("Invalid buyer object id");

    const existingChocolateId = await Chocolate.find({ _id: chocolateId });
    if (existingChocolateId.length == 0)
      throw new Error("Invalid chocolate object id");

    const newPurchase = new Purchase({
      buyerId: buyerId,
      chocolateId: chocolateId,
      date: request.body.date,
      amount: request.body.amount,
    });

    await newPurchase.save();
    return response.json("Purchase successfully created!");
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in createPurchase: ${validationErrors}`);
      return response.json(
        `Validation errors in createPurchase: ${validationErrors}`
      );
    }

    return response.json(`Error in getting purchases: ${error}`);
  }
};

const updatePurchaseById = async (request, response) => {
  const purchaseId = request.params.id;
  const buyerId = request.body.buyerId;
  const chocolateId = request.body.chocolateId;

  try {
    if (!mongoose.isValidObjectId(purchaseId))
      throw new Error("Invalid purchase object id");

    const existingBuyerId = await Buyer.find({ _id: buyerId });
    if (buyerId && existingBuyerId.length == 0)
      throw new Error("Invalid buyer object id");

    const existingChocolateId = await Chocolate.find({ _id: chocolateId });
    if (chocolateId && existingChocolateId.length == 0)
      throw new Error("Invalid chocolate object id");

    const updatedPurchaseById = await Purchase.findOneAndUpdate(
      { _id: purchaseId },
      {
        buyerId: request.body.buyerId,
        chocolateId: request.body.chocolateId,
        date: request.body.date,
        amount: request.body.amount,
      },
      { new: true }
    );
    return response.json(updatedPurchaseById);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(
        `Validation errors in updatedPurchaseById: ${validationErrors}`
      );
      return response.json(
        `Validation errors in updatedPurchaseById: ${validationErrors}`
      );
    }

    return response.json(`Error in updating purchase: ${error}`);
  }
};

const deletePurchaseById = async (request, response) => {
  const purchaseId = request.params.id;
  try {
    const purchases = await Purchase.deleteOne({ _id: purchaseId });
    return response.json(purchases);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(
        `Validation errors in deletePurchaseById: ${validationErrors}`
      );
      return response.json(
        `Validation errors in deletePurchaseById: ${validationErrors}`
      );
    }

    return response.json(`Error in deleting purchases: ${error}`);
  }
};

export default {
  getAllPurchases,
  getPurchasesById,
  createPurchase,
  updatePurchaseById,
  deletePurchaseById,
};
