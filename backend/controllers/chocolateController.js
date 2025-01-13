import mongoose from "mongoose";
import chocolateService from "../services/chocolateService.js";
import purchaseService from "../services/purchaseService.js";

const getAllChocolates = async (request, response) => {
  try {
    const chocolates = await chocolateService.getAllChocolates();
    return response.json(chocolates);
  } catch (error) {
    return response.json(`Error in getting chocolates: ${error}`);
  }
};

const getChocolatesById = async (request, response) => {
  const chocolateId = request.params.chocolateId;
  try {
    const chocolate = await chocolateService.getChocolatesById(chocolateId);
    return response.json(chocolate);
  } catch (error) {
    return response.json(`Error in getting chocolate with id: ${error}`);
  }
};

const createChocolate = async (request, response) => {
  const chocolateData = request.body;

  try {
    const newChocolate = await chocolateService.createChocolate(
      chocolateData.name,
      chocolateData.firmName,
      chocolateData.description,
      chocolateData.dateOfProduction,
      chocolateData.price,
      chocolateData.netWeight,
      chocolateData.cacaoPercentage,
      chocolateData.isVegan,
      chocolateData.isOrganic,
      chocolateData.ingredients
    );
    return response.json(newChocolate);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in createChocolate: ${validationErrors}`);
      return response.json(
        `Validation errors in createChocolate: ${validationErrors}`
      );
    }

    return response.json(`Error in getting chocolates: ${error}`);
  }
};

const updateChocolateById = async (request, response) => {
  const chocolateId = request.params.chocolateId;
  const chocolateData = request.body;
  try {
    console.log(chocolateData);
    const updatedChocolateById = await chocolateService.updateChocolateById(
      chocolateId,
      chocolateData.name,
      chocolateData.firmName,
      chocolateData.description,
      chocolateData.dateOfProduction,
      chocolateData.price,
      chocolateData.netWeight,
      chocolateData.cacaoPercentage,
      chocolateData.isVegan,
      chocolateData.isOrganic,
      chocolateData.ingredients
    );
    return response.json(updatedChocolateById);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(
        `Validation errors in updateChocolateById: ${validationErrors}`
      );
      return response.json(
        `Validation errors in updateChocolateById: ${validationErrors}`
      );
    }

    return response.json(`Error in updating chocolate: ${error}`);
  }
};

const deleteChocolateById = async (request, response) => {
  const chocolateId = request.params.chocolateId;
  try {
    const connectedPurchases =
      await purchaseService.findPurchaseByChocolateId(chocolateId);
    if (connectedPurchases.length != 0)
      throw new Error(
        "Chocolate object id exists in table Purchases so it cannot be deleted"
      );

    const deletedCount =
      await chocolateService.deleteChocolateById(chocolateId);
    return response.json(deletedCount);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(
        `Validation errors in deleteChocolateById: ${validationErrors}`
      );
      return response.json(
        `Validation errors in deleteChocolateById: ${validationErrors}`
      );
    }

    return response.json(`Error in deleting chocolates: ${error}`);
  }
};

export default {
  getAllChocolates,
  getChocolatesById,
  createChocolate,
  updateChocolateById,
  deleteChocolateById,
};
