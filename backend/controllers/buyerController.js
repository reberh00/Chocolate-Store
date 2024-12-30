import mongoose from "mongoose";
import Buyer from "../models/Buyers.js";

const getAllBuyers = async (request, response) => {
  try {
    const buyers = await Buyer.find({});
    return response.json(buyers);
  } catch (error) {
    return response.json(`Error in getting buyers: ${error}`);
  }
};

const getBuyersById = async (request, response) => {
  const buyerId = request.params.id;
  try {
    if (!mongoose.isValidObjectId(buyerId))
      throw new Error("Invalid object id");

    const buyer = await Buyer.find({ _id: buyerId });
    return response.json(buyer);
  } catch (error) {
    return response.json(`Error in getting buyer with id: ${error}`);
  }
};

const createBuyer = async (request, response) => {
  try {
    const newBuyer = new Buyer({
      firmName: request.body.firmName,
      firmAddress: request.body.firmAddress,
      description: request.body.description,
      dateEstablished: request.body.dateEstablished,
      netWorth: request.body.netWorth,
      countriesOfInterest: request.body.countriesOfInterest,
    });
    await newBuyer.save();
    return response.json("Buyer successfully created!");
  } catch (error) {
    return response.json(`Error in getting buyers: ${error}`);
  }
};

const updateBuyerById = async (request, response) => {
  const buyerId = request.params.id;
  try {
    if (!mongoose.isValidObjectId(buyerId))
      throw new Error("Invalid object id");

    const updatedBuyerById = await Buyer.findOneAndUpdate(
      { _id: buyerId },
      {
        firmName: request.body.firmName,
        firmAddress: request.body.firmAddress,
        description: request.body.description,
        dateEstablished: request.body.dateEstablished,
        netWorth: request.body.netWorth,
        countriesOfInterest: request.body.countriesOfInterest,
      },
      { new: true },
    );
    return response.json(updatedBuyerById);
  } catch (error) {
    return response.json(`Error in updating buyer: ${error}`);
  }
};

const deleteBuyerById = async (request, response) => {
  const buyerId = request.params.id;
  try {
    const buyers = await Buyer.deleteOne({ _id: buyerId });
    return response.json(buyers);
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
