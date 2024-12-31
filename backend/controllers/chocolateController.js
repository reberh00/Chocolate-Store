import mongoose from "mongoose";
import Chocolate from "../models/Chocolate.js";

const getAllChocolates = async (request, response) => {
  try {
    const chocolates = await Chocolate.find({});
    return response.json(chocolates);
  } catch (error) {
    return response.json(`Error in getting chocolates: ${error}`);
  }
};

const getChocolatesById = async (request, response) => {
  const chocolateId = request.params.id;
  try {
    if (!mongoose.isValidObjectId(chocolateId))
      throw new Error("Invalid object id");

    const chocolate = await Chocolate.find({ _id: chocolateId });
    return response.json(chocolate);
  } catch (error) {
    return response.json(`Error in getting chocolate with id: ${error}`);
  }
};

const createChocolate = async (request, response) => {
  try {
    const newChocolate = new Chocolate({
      name: request.body.name,
      firmName: request.body.firmName,
      description: request.body.description,
      dateOfProduction: request.body.dateOfProduction,
      price: request.body.price,
      netWeight: request.body.netWeight,
      cacaoPercentage: request.body.cacaoPercentage,
      isVegan: request.body.isVegan,
      isOrganic: request.body.isOrganic,
      ingredients: request.body.ingredients,
    });
    await newChocolate.save();
    return response.json("Chocolate successfully created!");
  } catch (error) {
    return response.json(`Error in getting chocolates: ${error}`);
  }
};

const updateChocolateById = async (request, response) => {
  const chocolateId = request.params.id;
  try {
    if (!mongoose.isValidObjectId(chocolateId))
      throw new Error("Invalid object id");

    const updatedChocolateById = await Chocolate.findOneAndUpdate(
      { _id: chocolateId },
      {
        name: request.body.name,
        firmName: request.body.firmName,
        description: request.body.description,
        dateOfProduction: request.body.dateOfProduction,
        price: request.body.price,
        netWeight: request.body.netWeight,
        cacaoPercentage: request.body.cacaoPercentage,
        isVegan: request.body.isVegan,
        isOrganic: request.body.isOrganic,
        ingredients: request.body.ingredients,
      },
      { new: true },
    );
    return response.json(updatedChocolateById);
  } catch (error) {
    return response.json(`Error in updating chocolate: ${error}`);
  }
};

const deleteChocolateById = async (request, response) => {
  const chocolateId = request.params.id;
  try {
    const connectedPurchases = await Purchase.find({
      buyerId,
    });
    if (connectedPurchases.length != 0)
      throw new Error(
        "Chocolate object id exists in table Purchases so it cannot be deleted",
      );

    const chocolates = await Chocolate.deleteOne({ _id: chocolateId });
    return response.json(chocolates);
  } catch (error) {
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
