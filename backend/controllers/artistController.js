import mongoose from "mongoose";
import artistService from "../services/artistService.js";
import origamiService from "../services/origamiService.js";

const getAllArtists = async (request, response) => {
  try {
    const artists = await artistService.getAllArtists();
    return response.json(artists);
  } catch (error) {
    return response.json(`Error in getting artists: ${error}`);
  }
};

const getArtistById = async (request, response) => {
  const artistId = request.params.artistId;
  try {
    const artist = await artistService.getArtistById(artistId);
    return response.json(artist);
  } catch (error) {
    return response.json(`Error in getting artist with id: ${error}`);
  }
};

const createArtist = async (request, response) => {
  const artistData = request.body;
  try {
    const newArtist = await artistService.createArtist(
      artistData.firstName,
      artistData.lastName,
      artistData.country,
      artistData.city,
      artistData.biography,
      artistData.netWorth,
      artistData.imageUrl,
    );
    return response.json(newArtist);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in createArtist: ${validationErrors}`);
      return response.json(
        `Validation errors in createArtist: ${validationErrors}`,
      );
    }
    return response.json(`Error in createArtist`);
  }
};

const updateArtistById = async (request, response) => {
  const artistId = request.params.artistId;
  const artistData = request.body;
  try {
    const updatedArtist = await artistService.updateArtistById(
      artistId,
      artistData.firstName,
      artistData.lastName,
      artistData.country,
      artistData.city,
      artistData.biography,
      artistData.netWorth,
      artistData.imageUrl,
    );
    return response.json(updatedArtist);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in updateArtistById: ${validationErrors}`);
      return response.json(
        `Validation errors in updateArtistById: ${validationErrors}`,
      );
    }

    return response.json(`Error in updating artist: ${error}`);
  }
};

const deleteArtistById = async (request, response) => {
  const artistId = request.params.artistId;
  try {
    const connectedArtist =
      await origamiService.findOrigamiByArtistId(artistId);
    if (connectedArtist.length != 0)
      throw new Error(
        "Artist connected to Origami object so it cannot be deleted",
      );

    const deletedCount = await artistService.deleteArtistById(artistId);
    return response.json(deletedCount);
  } catch (error) {
    return response.json(`Error in deleting artists: ${error}`);
  }
};

export default {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtistById,
  deleteArtistById,
};
