import mongoose from "mongoose";
import buyerService from "../services/buyerService.js";
import purchaseService from "../services/purchaseService.js";

const getAllBuyers = async (request, response) => {
  try {
    const buyers = await buyerService.getAllBuyers();
    return response.json(buyers);
  } catch (error) {
    return response.json(`Error in getting buyers: ${error}`);
  }
};

const getBuyersById = async (request, response) => {
  const buyerId = request.params.buyerId;
  try {
    const buyer = await buyerService.getBuyersById(buyerId);
    return response.json(buyer);
  } catch (error) {
    return response.json(`Error in getting buyer with id: ${error}`);
  }
};

const createBuyer = async (request, response) => {
  const buyerData = request.body;
  try {
    const newBuyer = await buyerService.createBuyer(...buyerData);
    return response.json(newBuyer);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in createBuyer: ${validationErrors}`);
      return response.json(
        `Validation errors in createBuyer: ${validationErrors}`,
      );
    }
    return response.json(`Error in createBuyer`);
  }
};

const updateBuyerById = async (request, response) => {
  const buyerId = request.params.buyerId;
  const buyerData = request.body;
  try {
    const updatedBuyerById = await buyerService.updateBuyerById(
      ...buyerData,
      buyerId,
    );
    return response.json(updatedBuyerById);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in updateBuyerById: ${validationErrors}`);
      return response.json(
        `Validation errors in updateBuyerById: ${validationErrors}`,
      );
    }

    return response.json(`Error in updating buyer: ${error}`);
  }
};

const deleteBuyerById = async (request, response) => {
  const buyerId = request.params.buyerId;
  try {
    const connectedPurchases =
      await purchaseService.findPurchaseByBuyerId(buyerId);
    if (connectedPurchases.length != 0)
      throw new Error(
        "Buyer object id exists in table Purchases so it cannot be deleted",
      );

    const deleteCount = await buyerService.deleteBuyerById(buyerId);
    return response.json(deleteCount);
  } catch (error) {
    return response.json(`Error in deleting buyers: ${error}`);
  }
};

export default {
  getAllBuyers,
  getBuyersById,
  createBuyer,
  updateBuyerById,
  deleteBuyerById,
};
