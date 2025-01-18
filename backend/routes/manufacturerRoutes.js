import express, { response } from "express";
import checkJwt from "../middlewares/validateJwtToken.js";
const manufacturerRouter = express.Router();
import manufacturerController from "../controllers/manufacturerController.js";
import validation from "../middlewares/validation.js";
import Joi from "joi";

/**
 * @swagger
 *  tags:
 *    - name: Manufacturer
 *      description: The Manufacturer management API
 */

/**
 * @swagger
 *  /manufacturers:
 *    get:
 *      tags: [Manufacturer]
 *      summary: Retrieve a list of all Manufacturers
 *      responses:
 *        200:
 *          description: Return list of all Manufacturers
 */
manufacturerRouter.get("/", manufacturerController.getAllManufacturers);

/**
 * @swagger
 *  /buyers/{id}:
 *    get:
 *      summary: Retrieve a Buyer
 *      tags: [Buyer]
 *      parameters:
 *        - name: id
 *          description: The Buyer id
 *          in: path
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Return single Buyer
 */
manufacturerRouter.get(
  "/:manufacturerId",
  validation.params({
    manufacturerId: Joi.string().hex().length(24).required(),
  }),
  manufacturerController.getManufacturerById,
);

/**
 * @swagger
 *  /buyers:
 *    post:
 *      summary: Create a new Buyer
 *      tags: [Buyer]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - firmName
 *                - firmAddress
 *                - description
 *                - dateEstablished
 *                - netWorth
 *                - countriesOfInterest
 *              properties:
 *                firmName:
 *                  type: string
 *                firmAddress:
 *                  type: string
 *                description:
 *                  type: string
 *                dateEstablished:
 *                  type: string
 *                netWorth:
 *                  type: number
 *                countriesOfInterest:
 *                  type: array
 *                  items:
 *                    type: string
 *      responses:
 *        200:
 *          description: Return created Buyer
 */
manufacturerRouter.post(
  "/",
  checkJwt,
  validation.body({
    firmName: Joi.string().required(),
    firmAddress: Joi.string().required(),
    description: Joi.string().required(),
    dateEstablished: Joi.date().required(),
    netWorth: Joi.number().integer().positive().required(),
    countriesOfInterest: Joi.array().items(Joi.string()),
    imageUrl: Joi.string().required(),
  }),
  manufacturerController.createManufacturer,
);

/**
 * @swagger
 *  /buyers/{id}:
 *    put:
 *      summary: Update a Buyer by id
 *      tags: [Buyer]
 *      parameters:
 *        - name: id
 *          description: The Buyer id
 *          in: path
 *          required: true
 *          type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                firmName:
 *                  type: string
 *                firmAddress:
 *                  type: string
 *                description:
 *                  type: string
 *                dateEstablished:
 *                  type: string
 *                netWorth:
 *                  type: number
 *                countriesOfInterest:
 *                  type: array
 *                  items:
 *                    type: string
 *      responses:
 *        200:
 *          description: Return updated Buyer
 */
manufacturerRouter.put(
  "/:manufacturerId",
  checkJwt,
  validation.params({
    manufacturerId: Joi.string().hex().length(24).required(),
  }),
  validation.body({
    firmName: Joi.string().required(),
    firmAddress: Joi.string().required(),
    description: Joi.string().required(),
    dateEstablished: Joi.date().required(),
    netWorth: Joi.number().integer().positive().required(),
    countriesOfInterest: Joi.array().items(Joi.string()),
    imageUrl: Joi.string().required(),
  }),
  manufacturerController.updateManufacturerById,
);

/**
 * @swagger
 *  /buyers/{id}:
 *    delete:
 *      summary: Delete a Buyer by id
 *      tags: [Buyer]
 *      parameters:
 *        - name: id
 *          description: The Buyer id
 *          in: path
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: The number of deleted Buyers
 */
manufacturerRouter.delete(
  "/:manufacturerId",
  checkJwt,
  validation.params({
    manufacturerId: Joi.string().hex().length(24).required(),
  }),
  manufacturerController.deleteManufacturerById,
);

export default manufacturerRouter;
