import express, { response } from "express";
import checkJwt from "../middlewares/validateJwtToken.js";
import artistController from "../controllers/artistController.js";
import validation from "../middlewares/validation.js";
import Joi from "joi";

const artistRouter = express.Router();

artistRouter.get("/", artistController.getAllArtists);

artistRouter.get(
  "/:artistId",
  validation.params({
    artistId: Joi.string().hex().length(24).required(),
  }),
  artistController.getArtistById,
);

artistRouter.post(
  "/",
  checkJwt,
  validation.body({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    biography: Joi.string().required(),
    netWorth: Joi.number().integer().positive().required(),
    imageUrl: Joi.string().required(),
  }),
  artistController.createArtist,
);

artistRouter.put(
  "/:artistId",
  checkJwt,
  validation.params({
    artistId: Joi.string().hex().length(24).required(),
  }),
  validation.body({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    biography: Joi.string().required(),
    netWorth: Joi.number().integer().positive().required(),
    imageUrl: Joi.string().required(),
  }),
  artistController.updateArtistById,
);

artistRouter.delete(
  "/:artistId",
  checkJwt,
  validation.params({
    artistId: Joi.string().hex().length(24).required(),
  }),
  artistController.deleteArtistById,
);

export default artistRouter;
