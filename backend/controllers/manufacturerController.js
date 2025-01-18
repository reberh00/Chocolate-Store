import mongoose from "mongoose";
import manufacturerService from "../services/manufacturerService.js";
import chocolateService from "../services/chocolateService.js";

const getAllManufacturers = async (request, response) => {
  try {
    const manufacturers = await manufacturerService.getAllManufacturers();
    return response.json(manufacturers);
  } catch (error) {
    return response.json(`Error in getting manufacturers: ${error}`);
  }
};

const getManufacturerById = async (request, response) => {
  const manufacturerId = request.params.manufacturerId;
  try {
    const manufacturer =
      await manufacturerService.getManufacturerById(manufacturerId);
    return response.json(manufacturer);
  } catch (error) {
    return response.json(`Error in getting manufacturer with id: ${error}`);
  }
};

const createManufacturer = async (request, response) => {
  const manufacturerData = request.body;
  try {
    const newManufacturer = await manufacturerService.createManufacturer(
      manufacturerData.firmName,
      manufacturerData.firmAddress,
      manufacturerData.description,
      manufacturerData.dateEstablished,
      manufacturerData.netWorth,
      manufacturerData.countriesOfInterest,
      manufacturerData.imageUrl,
    );
    return response.json(newManufacturer);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(
        `Validation errors in createManufacturer: ${validationErrors}`,
      );
      return response.json(
        `Validation errors in createManufacturer: ${validationErrors}`,
      );
    }
    return response.json(`Error in createManufacturer`);
  }
};

const updateManufacturerById = async (request, response) => {
  const manufacturerId = request.params.manufacturerId;
  const manufacturerData = request.body;
  try {
    const updatedManufacturerById =
      await manufacturerService.updateManufacturerById(
        manufacturerData.firmName,
        manufacturerData.firmAddress,
        manufacturerData.description,
        manufacturerData.dateEstablished,
        manufacturerData.netWorth,
        manufacturerData.countriesOfInterest,
        manufacturerData.imageUrl,
        manufacturerId,
      );
    return response.json(updatedManufacturerById);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(
        `Validation errors in updateManufacturerById: ${validationErrors}`,
      );
      return response.json(
        `Validation errors in updateManufacturerById: ${validationErrors}`,
      );
    }

    return response.json(`Error in updating manufacturer: ${error}`);
  }
};

const deleteManufacturerById = async (request, response) => {
  const manufacturerId = request.params.manufacturerId;
  try {
    const connectedChocolates =
      await chocolateService.findChocolateByManufacturerId(manufacturerId);
    if (connectedChocolates.length != 0)
      throw new Error(
        "Manufacturer object id exists in table Chocolates so it cannot be deleted",
      );

    const deletedCount =
      await manufacturerService.deleteManufacturerById(manufacturerId);
    return response.json(deletedCount);
  } catch (error) {
    return response.json(`Error in deleting manufacturers: ${error}`);
  }
};

export default {
  getAllManufacturers,
  getManufacturerById,
  createManufacturer,
  updateManufacturerById,
  deleteManufacturerById,
};
