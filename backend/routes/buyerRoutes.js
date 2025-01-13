import express, { response } from "express";
import checkJwt from "../middlewares/validateJwtToken.js";
const buyerRouter = express.Router();
import buyerController from "../controllers/buyerController.js";
import validation from "../middlewares/validation.js";
import Joi from "joi";

/**
 * @swagger
 *  tags:
 *    - name: Buyer
 *      description: The Buyer management API
 */

/**
 * @swagger
 *  /buyers:
 *    get:
 *      tags: [Buyer]
 *      summary: Retrieve a list of all Buyers
 *      responses:
 *        200:
 *          description: Return list of all Buyers
 */
buyerRouter.get("/", buyerController.getAllBuyers);

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
buyerRouter.get(
  "/:buyerId",
  validation.params({ buyerId: Joi.string().hex().length(24).required() }),
  buyerController.getBuyersById,
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
buyerRouter.post(
  "/",
  checkJwt,
  validation.body({
    firmName: Joi.string().required(),
    firmAddress: Joi.string().required(),
    description: Joi.string().required(),
    dateEstablished: Joi.date().required(),
    netWorth: Joi.number().integer().positive().required(),
    countriesOfInterest: Joi.array().items(Joi.string()),
  }),
  buyerController.createBuyer,
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
buyerRouter.put(
  "/:buyerId",
  checkJwt,
  validation.params({
    buyerId: Joi.string().hex().length(24).required(),
  }),
  validation.body({
    firmName: Joi.string().required(),
    firmAddress: Joi.string().required(),
    description: Joi.string().required(),
    dateEstablished: Joi.date().required(),
    netWorth: Joi.number().integer().positive().required(),
    countriesOfInterest: Joi.array().items(Joi.string()),
  }),
  buyerController.updateBuyerById,
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
buyerRouter.delete(
  "/:buyerId",
  checkJwt,
  validation.params({
    buyerId: Joi.string().hex().length(24).required(),
  }),
  buyerController.deleteBuyerById,
);

export default buyerRouter;
