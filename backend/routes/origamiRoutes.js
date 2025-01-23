import express from "express";
import Joi from "joi";
import checkJwt from "../middlewares/validateJwtToken.js";
import validation from "../middlewares/validation.js";
import origamiController from "../controllers/origamiController.js";

const origamiRouter = express.Router();

origamiRouter.get("/", origamiController.getAllOrigamis);

origamiRouter.get(
  "/:origamiId",
  validation.params({
    origamiId: Joi.string().hex().length(24).required(),
  }),
  origamiController.getOrigamiById,
);

origamiRouter.post(
  "/",
  checkJwt,
  validation.body({
    name: Joi.string().required(),
    price: Joi.number().positive().integer().required(),
    numberOfFolds: Joi.number().positive().integer().required(),
    originYear: Joi.number().positive().integer().required(),
    originStory: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().required(),
    artist: Joi.string().hex().length(24).required(),
  }),
  origamiController.createOrigami,
);

origamiRouter.put(
  "/:origamiId",
  checkJwt,
  validation.params({
    origamiId: Joi.string().hex().length(24).required(),
  }),
  validation.body({
    name: Joi.string().required(),
    price: Joi.number().positive().integer().required(),
    numberOfFolds: Joi.number().positive().integer().required(),
    originYear: Joi.number().positive().integer().required(),
    originStory: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().required(),
    artist: Joi.string().hex().length(24).required(),
  }),
  origamiController.updateOrigamiById,
);

origamiRouter.delete(
  "/:origamiId",
  checkJwt,
  validation.params({
    origamiId: Joi.string().hex().length(24).required(),
  }),
  origamiController.deleteOrigamiById,
);

export default origamiRouter;
