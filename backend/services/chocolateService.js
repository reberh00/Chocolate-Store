import Chocolate from "../models/Chocolate.js";

async function getAllChocolates() {
  const chocolates = await Chocolate.find({});
  return chocolates;
}

async function getChocolatesById(chocolateId) {
  const chocolate = await Chocolate.find({ _id: chocolateId });
  return chocolate;
}

async function createChocolate(
  name,
  firmName,
  description,
  dateOfProduction,
  price,
  netWeight,
  cacaoPercentage,
  isVegan,
  isOrganic,
  ingredients
) {
  const newChocolate = new Chocolate(
    name,
    firmName,
    description,
    dateOfProduction,
    price,
    netWeight,
    cacaoPercentage,
    isVegan,
    isOrganic,
    ingredients
  );
  await Chocolate.save();
  return newChocolate;
}

async function updateChocolateById(
  name,
  firmName,
  description,
  dateOfProduction,
  price,
  netWeight,
  cacaoPercentage,
  isVegan,
  isOrganic,
  ingredients,
  chocolateId
) {
  const updatedChocolateById = await Chocolate.findOneAndUpdate(
    { _id: chocolateId },
    {
      name,
      firmName,
      description,
      dateOfProduction,
      price,
      netWeight,
      cacaoPercentage,
      isVegan,
      isOrganic,
      ingredients,
    },
    { new: true }
  );
  return updatedChocolateById;
}

async function deleteChocolateById(chocolateId) {
  const deleteCount = await Chocolate.deleteOne({ _id: chocolateId });
  return deleteCount;
}

export default {
  getAllChocolates,
  getChocolatesById,
  createChocolate,
  updateChocolateById,
  deleteChocolateById,
};
