import Manufacturer from "../models/Manufacturer.js";

async function getAllManufacturers() {
  const manufacturers = await Manufacturer.find({});
  return manufacturers;
}

async function getManufacturerById(manufacturerId) {
  const manufacturer = await Manufacturer.findOne({ _id: manufacturerId });
  return manufacturer;
}

async function createManufacturer(
  firmName,
  firmAddress,
  description,
  dateEstablished,
  netWorth,
  countriesOfInterest,
  imageUrl,
) {
  const newManufacturer = new Manufacturer({
    firmName,
    firmAddress,
    description,
    dateEstablished,
    netWorth,
    countriesOfInterest,
    imageUrl,
  });
  await newManufacturer.save();
  return newManufacturer;
}

async function updateManufacturerById(
  firmName,
  firmAddress,
  description,
  dateEstablished,
  netWorth,
  countriesOfInterest,
  imageUrl,
  manufacturerId,
) {
  const updatedManufacturerById = await Manufacturer.findOneAndUpdate(
    { _id: manufacturerId },
    {
      firmName,
      firmAddress,
      description,
      dateEstablished,
      netWorth,
      countriesOfInterest,
      imageUrl,
    },
    { new: true },
  );
  return updatedManufacturerById;
}

async function deleteManufacturerById(manufacturerById) {
  const deletedCount = await Manufacturer.deleteOne({ _id: manufacturerById });
  return deletedCount;
}

export default {
  getAllManufacturers,
  getManufacturerById,
  createManufacturer,
  updateManufacturerById,
  deleteManufacturerById,
};
