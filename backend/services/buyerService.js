import Buyer from "../models/Buyer.js";

async function getAllBuyers() {
  const buyers = await Buyer.find({});
  return buyers;
}

async function getBuyerById(buyerId) {
  const buyer = await Buyer.findOne({ _id: buyerId });
  return buyer;
}

async function createBuyer(
  firmName,
  firmAddress,
  description,
  dateEstablished,
  netWorth,
  countriesOfInterest
) {
  const newBuyer = new Buyer({
    firmName,
    firmAddress,
    description,
    dateEstablished,
    netWorth,
    countriesOfInterest,
  });
  await newBuyer.save();
  return newBuyer;
}

async function updateBuyerById(
  firmName,
  firmAddress,
  description,
  dateEstablished,
  netWorth,
  countriesOfInterest,
  buyerId
) {
  const updatedBuyerById = await Buyer.findOneAndUpdate(
    { _id: buyerId },
    {
      firmName,
      firmAddress,
      description,
      dateEstablished,
      netWorth,
      countriesOfInterest,
    },
    { new: true }
  );
  return updatedBuyerById;
}

async function deleteBuyerById(buyerId) {
  const deletedCount = await Buyer.deleteOne({ _id: buyerId });
  return deletedCount;
}

export default {
  getAllBuyers,
  getBuyerById,
  createBuyer,
  updateBuyerById,
  deleteBuyerById,
};
