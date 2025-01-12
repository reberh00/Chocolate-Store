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
 * /buyers/:
 *   get:
 *     summary: Retrieve a list of all buyers
 *     tags: [Buyer]
 *     responses:
 *       200:
 *         description: A list of buyers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the buyer
 *                     example: 60d0fe4f5311236168a109cb
 *                   firmName:
 *                     type: string
 *                     description: Name of the buyer's firm
 *                     example: Global Trade Co.
 *                   firmAddress:
 *                     type: string
 *                     description: Address of the buyer's firm
 *                     example: 123 Market Street, New York, NY
 *                   description:
 *                     type: string
 *                     description: Description of the buyer's firm
 *                     example: A leading buyer in the global chocolate trade.
 *                   dateEstablished:
 *                     type: string
 *                     format: date
 *                     description: The date when the buyer's firm was established
 *                     example: 2010-05-15
 *                   netWorth:
 *                     type: integer
 *                     description: Net worth of the firm in USD
 *                     example: 1000000
 *                   countriesOfInterest:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of countries the firm is interested in
 *                     example: [ "USA", "Canada", "Germany" ]
 *       500:
 *         description: Internal server error
 */
buyerRouter.get("/", buyerController.getAllBuyers);

/**
 * @swagger
 * /buyers/{buyerId}:
 *   get:
 *     summary: Retrieve a specific buyer by its ID
 *     tags: [Buyer]
 *     parameters:
 *       - in: path
 *         name: buyerId
 *         required: true
 *         description: The ID of the buyer to retrieve
 *         schema:
 *           type: string
 *           format: hex
 *           minLength: 24
 *           maxLength: 24
 *           example: 60d0fe4f5311236168a109cb
 *     responses:
 *       200:
 *         description: Details of the requested buyer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the buyer
 *                   example: 60d0fe4f5311236168a109cb
 *                 firmName:
 *                   type: string
 *                   description: Name of the buyer's firm
 *                   example: Global Trade Co.
 *                 firmAddress:
 *                   type: string
 *                   description: Address of the buyer's firm
 *                   example: 123 Market Street, New York, NY
 *                 description:
 *                   type: string
 *                   description: Description of the buyer's firm
 *                   example: A leading buyer in the global chocolate trade.
 *                 dateEstablished:
 *                   type: string
 *                   format: date
 *                   description: The date when the buyer's firm was established
 *                   example: 2010-05-15
 *                 netWorth:
 *                   type: integer
 *                   description: Net worth of the firm in USD
 *                   example: 1000000
 *                 countriesOfInterest:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of countries the firm is interested in
 *                   example: [ "USA", "Canada", "Germany" ]
 *       400:
 *         description: Invalid buyer ID provided
 *       404:
 *         description: Buyer not found
 *       500:
 *         description: Internal server error
 */
buyerRouter.get(
  "/:buyerId",
  validation.params({ buyerId: Joi.string().hex().length(24).required() }),
  buyerController.getBuyersById
);

/**
 * @swagger
 * /buyers/:
 *   post:
 *     summary: Create a new buyer
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firmName:
 *                 type: string
 *                 description: Name of the buyer's firm
 *                 example: Global Trade Co.
 *               firmAddress:
 *                 type: string
 *                 description: Address of the buyer's firm
 *                 example: 123 Market Street, New York, NY
 *               description:
 *                 type: string
 *                 description: Description of the buyer's firm
 *                 example: A leading buyer in the global chocolate trade.
 *               dateEstablished:
 *                 type: string
 *                 format: date
 *                 description: The date when the buyer's firm was established
 *                 example: 2010-05-15
 *               netWorth:
 *                 type: integer
 *                 description: Net worth of the firm in USD
 *                 example: 1000000
 *               countriesOfInterest:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of countries the firm is interested in
 *                 example: [ "USA", "Canada", "Germany" ]
 *     responses:
 *       200:
 *         description: Buyer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the created buyer
 *                   example: 60d0fe4f5311236168a109cb
 *                 firmName:
 *                   type: string
 *                   description: Name of the buyer's firm
 *                   example: Global Trade Co.
 *                 firmAddress:
 *                   type: string
 *                   description: Address of the buyer's firm
 *                   example: 123 Market Street, New York, NY
 *                 description:
 *                   type: string
 *                   description: Description of the buyer's firm
 *                   example: A leading buyer in the global chocolate trade.
 *                 dateEstablished:
 *                   type: string
 *                   format: date
 *                   description: The date when the buyer's firm was established
 *                   example: 2010-05-15
 *                 netWorth:
 *                   type: integer
 *                   description: Net worth of the firm in USD
 *                   example: 1000000
 *                 countriesOfInterest:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of countries the firm is interested in
 *                   example: [ "USA", "Canada", "Germany" ]
 *       400:
 *         description: Validation error in request body
 *       401:
 *         description: Unauthorized, JWT is missing or invalid
 *       500:
 *         description: Internal server error
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
  buyerController.createBuyer
);

/**
 * @swagger
 * /buyers/{buyerId}:
 *   put:
 *     summary: Update a specific buyer by its ID
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: buyerId
 *         required: true
 *         description: The ID of the buyer to update
 *         schema:
 *           type: string
 *           format: hex
 *           minLength: 24
 *           maxLength: 24
 *           example: 60d0fe4f5311236168a109cb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firmName:
 *                 type: string
 *                 description: Name of the buyer's firm
 *                 example: Global Trade Co.
 *               firmAddress:
 *                 type: string
 *                 description: Address of the buyer's firm
 *                 example: 123 Market Street, New York, NY
 *               description:
 *                 type: string
 *                 description: Description of the buyer's firm
 *                 example: A leading buyer in the global chocolate trade.
 *               dateEstablished:
 *                 type: string
 *                 format: date
 *                 description: The date when the buyer's firm was established
 *                 example: 2010-05-15
 *               netWorth:
 *                 type: integer
 *                 description: Net worth of the firm in USD
 *                 example: 1000000
 *               countriesOfInterest:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of countries the firm is interested in
 *                 example: [ "USA", "Canada", "Germany" ]
 *     responses:
 *       200:
 *         description: Buyer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the buyer
 *                   example: 60d0fe4f5311236168a109cb
 *                 firmName:
 *                   type: string
 *                   description: Name of the buyer's firm
 *                   example: Global Trade Co.
 *                 firmAddress:
 *                   type: string
 *                   description: Address of the buyer's firm
 *                   example: 123 Market Street, New York, NY
 *                 description:
 *                   type: string
 *                   description: Description of the buyer's firm
 *                   example: A leading buyer in the global chocolate trade.
 *                 dateEstablished:
 *                   type: string
 *                   format: date
 *                   description: The date when the buyer's firm was established
 *                   example: 2010-05-15
 *                 netWorth:
 *                   type: integer
 *                   description: Net worth of the firm in USD
 *                   example: 1000000
 *                 countriesOfInterest:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of countries the firm is interested in
 *                   example: [ "USA", "Canada", "Germany" ]
 *       400:
 *         description: Validation error in request body
 *       401:
 *         description: Unauthorized, JWT is missing or invalid
 *       404:
 *         description: Buyer not found
 *       500:
 *         description: Internal server error
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
  buyerController.updateBuyerById
);

/**
 * @swagger
 * /buyers/{buyerId}:
 *   delete:
 *     summary: Delete a specific buyer by its ID
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: buyerId
 *         required: true
 *         description: The ID of the buyer to delete
 *         schema:
 *           type: string
 *           format: hex
 *           minLength: 24
 *           maxLength: 24
 *           example: 60d0fe4f5311236168a109cb
 *     responses:
 *       200:
 *         description: Buyer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: integer
 *                   description: The number of buyers deleted
 *                   example: 1
 *       400:
 *         description: Invalid buyer ID provided
 *       401:
 *         description: Unauthorized, JWT is missing or invalid
 *       404:
 *         description: Buyer not found
 *       500:
 *         description: Internal server error
 */
buyerRouter.delete(
  "/:buyerId",
  checkJwt,
  validation.params({
    buyerId: Joi.string().hex().length(24).required(),
  }),
  buyerController.deleteBuyerById
);

export default buyerRouter;
