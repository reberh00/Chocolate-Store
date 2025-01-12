import Chocolate from "../models/Chocolate";

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

export default { createChocolate };
