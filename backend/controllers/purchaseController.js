import mongoose from "mongoose";
import purchaseService from "../services/purchaseService.js";
import chocolateService from "../services/chocolateService.js";
import buyerService from "../services/buyerService.js";

const getAllPurchases = async (request, response) => {
  try {
    const purchases = await purchaseService.getAllPurchases();
    return response.json(purchases);
  } catch (error) {
    return response.json(`Error in getting purchases: ${error}`);
  }
};

const getPurchasesById = async (request, response) => {
  const purchaseId = request.params.purchaseId;
  try {
    const purchase = await purchaseService.getPurchasesById(purchaseId);
    return response.json(purchase);
  } catch (error) {
    return response.json(`Error in getting purchase with id: ${error}`);
  }
};

const createPurchase = async (request, response) => {
  const buyerId = request.body.buyerId;
  const chocolateId = request.body.chocolateId;
  const purchaseData = request.body;

  try {
    const existingBuyerId = await buyerService.getBuyerById(buyerId);
    if (existingBuyerId.length == 0) throw new Error("Invalid buyer object id");

    const existingChocolateId =
      await chocolateService.getChocolatesById(chocolateId);
    if (existingChocolateId.length == 0)
      throw new Error("Invalid chocolate object id");

    const newPurchase = await purchaseService.createPurchase(...purchaseData);

    return response.json(newPurchase);
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
  const purchaseId = request.params.purchaseId;
  const purchaseData = request.body;

  try {
    const existingBuyerId = await buyerService.getBuyerById(
      purchaseData.buyerId
    );
    if (existingBuyerId.length == 0) throw new Error("Invalid buyer object id");

    const existingChocolateId = await chocolateService.getChocolatesById(
      purchaseData.chocolateId
    );
    if (existingChocolateId.length == 0)
      throw new Error("Invalid chocolate object id");

    const updatedPurchaseById = await purchaseService.updatePurchaseById(
      ...purchaseData,
      purchaseId
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
  const purchaseId = request.params.purchaseId;
  try {
    const deleteCount = await purchaseService.deletePurchaseById(purchaseId);
    return response.json(deleteCount);
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
