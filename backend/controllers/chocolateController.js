import mongoose from "mongoose";
import Chocolate from "../models/Chocolate.js";
import Purchase from "../models/Purchase.js";

const getAllChocolates = async (request, response) => {
  try {
    const chocolates = await Chocolate.find({});
    return response.json(chocolates);
  } catch (error) {
    return response.json(`Error in getting chocolates: ${error}`);
  }
};

const getChocolatesById = async (request, response) => {
  const chocolateId = request.params.chocolateId;
  try {
    const chocolate = await Chocolate.find({ _id: chocolateId });
    return response.json(chocolate);
  } catch (error) {
    return response.json(`Error in getting chocolate with id: ${error}`);
  }
};

const createChocolate = async (request, response) => {
  const newChocolateData = request.body;

  try {
    const newChocolate = new Chocolate({
      ...newChocolateData,
    });
    await newChocolate.save();
    return response.json(newChocolate);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in createChocolate: ${validationErrors}`);
      return response.json(
        `Validation errors in createChocolate: ${validationErrors}`,
      );
    }

    return response.json(`Error in getting chocolates: ${error}`);
  }
};

const updateChocolateById = async (request, response) => {
  const chocolateId = request.params.chocolateId;
  const chocolateData = request.body;
  try {
    const updatedChocolateById = await Chocolate.findOneAndUpdate(
      { _id: chocolateId },
      {
        ...chocolateData,
      },
      { new: true },
    );
    return response.json(updatedChocolateById);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(
        `Validation errors in updateChocolateById: ${validationErrors}`,
      );
      return response.json(
        `Validation errors in updateChocolateById: ${validationErrors}`,
      );
    }

    return response.json(`Error in updating chocolate: ${error}`);
  }
};

const deleteChocolateById = async (request, response) => {
  const chocolateId = request.params.chocolateId;
  try {
    const connectedPurchases = await Purchase.find({
      chocolateId,
    });
    if (connectedPurchases.length != 0)
      throw new Error(
        "Chocolate object id exists in table Purchases so it cannot be deleted",
      );

    const deleteCount = await Chocolate.deleteOne({ _id: chocolateId });
    return response.json(deleteCount);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(
        `Validation errors in deleteChocolateById: ${validationErrors}`,
      );
      return response.json(
        `Validation errors in deleteChocolateById: ${validationErrors}`,
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
