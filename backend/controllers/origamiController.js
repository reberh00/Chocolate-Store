import mongoose from "mongoose";
import origamiService from "../services/origamiService.js";
import artistService from "../services/artistService.js";

const getAllOrigamis = async (request, response) => {
  try {
    const origamis = await origamiService.getAllOrigamis();
    return response.json(origamis);
  } catch (error) {
    return response.json(`Error in getting origamis: ${error}`);
  }
};

const getOrigamiById = async (request, response) => {
  const origamiId = request.params.origamiId;
  try {
    const origami = await origamiService.getOrigamiById(origamiId);
    return response.json(origami);
  } catch (error) {
    return response.json(`Error in getting origami with id: ${error}`);
  }
};

const createOrigami = async (request, response) => {
  const origamiData = request.body;

  try {
    const aritst = await artistService.getArtistById(origamiData.artist);
    if (!aritst) throw new Error("Invalid manufacturer object id");

    const newOrigami = await origamiService.createOrigami(
      origamiData.name,
      origamiData.price,
      origamiData.numberOfFolds,
      origamiData.originYear,
      origamiData.originStory,
      origamiData.description,
      origamiData.imageUrl,
      origamiData.artist,
    );
    return response.json(newOrigami);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in createOrigami: ${validationErrors}`);
      return response.json(
        `Validation errors in createOrigami: ${validationErrors}`,
      );
    }

    return response.json(`Error in getting origamis: ${error}`);
  }
};

const updateOrigamiById = async (request, response) => {
  const origamiId = request.params.origamiId;
  const origamiData = request.body;
  try {
    const aritst = await artistService.getArtistById(origamiData.artist);
    if (!aritst) throw new Error("Invalid manufacturer object id");

    const updatedOrigami = await origamiService.updateOrigamiById(
      origamiId,
      origamiData.name,
      origamiData.price,
      origamiData.numberOfFolds,
      origamiData.originYear,
      origamiData.originStory,
      origamiData.description,
      origamiData.imageUrl,
      origamiData.artist,
    );
    return response.json(updatedOrigami);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(
        `Validation errors in updateOrigamiById: ${validationErrors}`,
      );
      return response.json(
        `Validation errors in updateOrigamiById: ${validationErrors}`,
      );
    }

    return response.json(`Error in updating origami: ${error}`);
  }
};

const deleteOrigamiById = async (request, response) => {
  const origamiId = request.params.origamiId;
  try {
    const deletedCount = await origamiService.deleteOrigamiById(origamiId);
    return response.json(deletedCount);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(
        `Validation errors in deleteOrigamiById: ${validationErrors}`,
      );
      return response.json(
        `Validation errors in deleteOrigamiById: ${validationErrors}`,
      );
    }

    return response.json(`Error in deleting origamis: ${error}`);
  }
};

export default {
  getAllOrigamis,
  getOrigamiById,
  createOrigami,
  updateOrigamiById,
  deleteOrigamiById,
};
