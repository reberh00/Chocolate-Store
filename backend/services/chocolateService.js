import Chocolate from "../models/Chocolate.js";

async function getAllChocolates() {
  const chocolates = await Chocolate.find({});
  return chocolates;
}

async function getChocolatesById(chocolateId) {
  const chocolate = await Chocolate.findOne({ _id: chocolateId });
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
  const newChocolate = new Chocolate({
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
  });

  await newChocolate.save();
  return newChocolate;
}

async function updateChocolateById(
  chocolateId,
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
  const deletedCount = await Chocolate.deleteOne({ _id: chocolateId });
  return deletedCount;
}

export default {
  getAllChocolates,
  getChocolatesById,
  createChocolate,
  updateChocolateById,
  deleteChocolateById,
};
