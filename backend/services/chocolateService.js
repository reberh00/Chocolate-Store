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
  description,
  dateOfProduction,
  price,
  netWeight,
  cacaoPercentage,
  isVegan,
  isOrganic,
  ingredients,
  imageUrl,
  manufacturerId,
) {
  const newChocolate = new Chocolate({
    name,
    description,
    dateOfProduction,
    price,
    netWeight,
    cacaoPercentage,
    isVegan,
    isOrganic,
    ingredients,
    imageUrl,
    manufacturerId,
  });

  await newChocolate.save();
  return newChocolate;
}

async function updateChocolateById(
  chocolateId,
  name,
  description,
  dateOfProduction,
  price,
  netWeight,
  cacaoPercentage,
  isVegan,
  isOrganic,
  ingredients,
  imageUrl,
  manufacturerId,
) {
  const updatedChocolateById = await Chocolate.findOneAndUpdate(
    { _id: chocolateId },
    {
      name,
      description,
      dateOfProduction,
      price,
      netWeight,
      cacaoPercentage,
      isVegan,
      isOrganic,
      ingredients,
      imageUrl,
      manufacturerId,
    },
    { new: true },
  );
  return updatedChocolateById;
}

async function deleteChocolateById(chocolateId) {
  const deletedCount = await Chocolate.deleteOne({ _id: chocolateId });
  return deletedCount;
}

async function findChocolateByManufacturerId(manufacturerId) {
  const chocolates = await Chocolate.find({ manufacturerId: manufacturerId });
  return chocolates;
}

export default {
  getAllChocolates,
  getChocolatesById,
  createChocolate,
  updateChocolateById,
  deleteChocolateById,
  findChocolateByManufacturerId,
};
