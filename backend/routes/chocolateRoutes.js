import express, { response } from "express";
import checkJwt from "../middlewares/validateJwtToken.js";
const chocolateRouter = express.Router();
import chocolateController from "../controllers/chocolateController.js";
import validation from "../middlewares/validation.js";
import Joi from "joi";

/**
 * @swagger
 *  tags:
 *    - name: Chocolate
 *      description: The Chocolate management API
 */

/**
 * @swagger
 * /chocolates:
 *   get:
 *     summary: Retrieve a list of all chocolates
 *     tags: [Chocolate]
 *     responses:
 *       200:
 *         description: A list of chocolates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the chocolate
 *                     example: 123abc
 *                   name:
 *                     type: string
 *                     description: Name of the chocolate
 *                     example: Dark Delight
 *                   firmName:
 *                     type: string
 *                     description: Name of the firm producing the chocolate
 *                     example: Choco Bliss Co.
 *                   description:
 *                     type: string
 *                     description: Description of the chocolate
 *                     example: A rich, dark chocolate bar with 70% cacao.
 *                   dateOfProduction:
 *                     type: string
 *                     format: date
 *                     description: Production date of the chocolate
 *                     example: 2025-01-01
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: Price of the chocolate
 *                     example: 4.99
 *                   netWeight:
 *                     type: number
 *                     format: float
 *                     description: Net weight of the chocolate in grams
 *                     example: 100
 *                   cacaoPercentage:
 *                     type: number
 *                     format: float
 *                     description: Percentage of cacao in the chocolate
 *                     example: 70
 *                   isVegan:
 *                     type: boolean
 *                     description: Indicates if the chocolate is vegan
 *                     example: true
 *                   isOrganic:
 *                     type: boolean
 *                     description: Indicates if the chocolate is organic
 *                     example: false
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of ingredients in the chocolate
 *                     example: [ "Cocoa", "Sugar", "Vanilla" ]
 *       500:
 *         description: Internal server error
 */
chocolateRouter.get("/", chocolateController.getAllChocolates);

/**
 * @swagger
 * /chocolates/{chocolateId}:
 *   get:
 *     summary: Retrieve a specific chocolate by its ID
 *     tags: [Chocolate]
 *     parameters:
 *       - in: path
 *         name: chocolateId
 *         required: true
 *         description: The ID of the chocolate to retrieve
 *         schema:
 *           type: string
 *           format: hex
 *           minLength: 24
 *           maxLength: 24
 *           example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Details of the requested chocolate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the chocolate
 *                   example: 60d0fe4f5311236168a109ca
 *                 name:
 *                   type: string
 *                   description: Name of the chocolate
 *                   example: Dark Delight
 *                 firmName:
 *                   type: string
 *                   description: Name of the firm producing the chocolate
 *                   example: Choco Bliss Co.
 *                 description:
 *                   type: string
 *                   description: Description of the chocolate
 *                   example: A rich, dark chocolate bar with 70% cacao.
 *                 dateOfProduction:
 *                   type: string
 *                   format: date
 *                   description: Production date of the chocolate
 *                   example: 2025-01-01
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the chocolate
 *                   example: 4.99
 *                 netWeight:
 *                   type: number
 *                   format: float
 *                   description: Net weight of the chocolate in grams
 *                   example: 100
 *                 cacaoPercentage:
 *                   type: number
 *                   format: float
 *                   description: Percentage of cacao in the chocolate
 *                   example: 70
 *                 isVegan:
 *                   type: boolean
 *                   description: Indicates if the chocolate is vegan
 *                   example: true
 *                 isOrganic:
 *                   type: boolean
 *                   description: Indicates if the chocolate is organic
 *                   example: false
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of ingredients in the chocolate
 *                   example: [ "Cocoa", "Sugar", "Vanilla" ]
 *       400:
 *         description: Invalid chocolate ID provided
 *       404:
 *         description: Chocolate not found
 *       500:
 *         description: Internal server error
 */
chocolateRouter.get(
  "/:chocolateId",
  validation.params({
    chocolateId: Joi.string().hex().length(24).required(),
  }),
  chocolateController.getChocolatesById
);

/**
 * @swagger
 * /chocolates:
 *   post:
 *     summary: Create a new chocolate entry
 *     tags: [Chocolate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the chocolate
 *                 example: Dark Delight
 *               firmName:
 *                 type: string
 *                 description: Name of the firm producing the chocolate
 *                 example: Choco Bliss Co.
 *               description:
 *                 type: string
 *                 description: Description of the chocolate
 *                 example: A rich, dark chocolate bar with 70% cacao.
 *               dateOfProduction:
 *                 type: string
 *                 format: date
 *                 description: Production date of the chocolate
 *                 example: 2025-01-01
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the chocolate
 *                 example: 4.99
 *               netWeight:
 *                 type: number
 *                 format: float
 *                 description: Net weight of the chocolate in grams
 *                 example: 100
 *               cacaoPercentage:
 *                 type: number
 *                 format: float
 *                 description: Percentage of cacao in the chocolate
 *                 example: 70
 *               isVegan:
 *                 type: boolean
 *                 description: Indicates if the chocolate is vegan
 *                 example: true
 *               isOrganic:
 *                 type: boolean
 *                 description: Indicates if the chocolate is organic
 *                 example: false
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients in the chocolate
 *                 example: [ "Cocoa", "Sugar", "Vanilla" ]
 *     responses:
 *       200:
 *         description: Chocolate created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the chocolate
 *                   example: 123abc
 *                 name:
 *                   type: string
 *                   description: Name of the chocolate
 *                   example: Dark Delight
 *                 firmName:
 *                   type: string
 *                   description: Firm name
 *                   example: Choco Bliss Co.
 *                 description:
 *                   type: string
 *                   description: Description of the chocolate
 *                   example: A rich, dark chocolate bar with 70% cacao.
 *                 dateOfProduction:
 *                   type: string
 *                   format: date
 *                   description: Production date of the chocolate
 *                   example: 2025-01-01
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the chocolate
 *                   example: 4.99
 *                 netWeight:
 *                   type: number
 *                   format: float
 *                   description: Net weight of the chocolate
 *                   example: 100
 *                 cacaoPercentage:
 *                   type: number
 *                   format: float
 *                   description: Percentage of cacao in the chocolate
 *                   example: 70
 *                 isVegan:
 *                   type: boolean
 *                   description: Indicates if the chocolate is vegan
 *                   example: true
 *                 isOrganic:
 *                   type: boolean
 *                   description: Indicates if the chocolate is organic
 *                   example: false
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of ingredients in the chocolate
 *                   example: [ "Cocoa", "Sugar", "Vanilla" ]
 *       400:
 *         description: Bad request, validation error
 *       401:
 *         description: Unauthorized, JWT is missing or invalid
 *       500:
 *         description: Internal server error
 */
chocolateRouter.post(
  "/",
  checkJwt,
  validation.body({
    name: Joi.string().required(),
    firmName: Joi.string().required(),
    description: Joi.string().required(),
    dateOfProduction: Joi.date().required,
    price: Joi.number().positive().required(),
    netWeight: Joi.number().positive().required(),
    cacaoPercentage: Joi.number().positive().required(),
    isVegan: Joi.boolean().required(),
    isOrganic: Joi.boolean().required(),
    ingredients: Joi.array().items(Joi.string()),
  }),
  chocolateController.createChocolate
);

/**
 * @swagger
 * /chocolates/{chocolateId}:
 *   put:
 *     summary: Update a specific chocolate by its ID
 *     tags: [Chocolate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chocolateId
 *         required: true
 *         description: The ID of the chocolate to update
 *         schema:
 *           type: string
 *           format: hex
 *           minLength: 24
 *           maxLength: 24
 *           example: 60d0fe4f5311236168a109ca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the chocolate
 *                 example: Dark Delight
 *               firmName:
 *                 type: string
 *                 description: Name of the firm producing the chocolate
 *                 example: Choco Bliss Co.
 *               description:
 *                 type: string
 *                 description: Description of the chocolate
 *                 example: A rich, dark chocolate bar with 70% cacao.
 *               dateOfProduction:
 *                 type: string
 *                 format: date
 *                 description: Production date of the chocolate
 *                 example: 2025-01-01
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the chocolate
 *                 example: 4.99
 *               netWeight:
 *                 type: number
 *                 format: float
 *                 description: Net weight of the chocolate in grams
 *                 example: 100
 *               cacaoPercentage:
 *                 type: number
 *                 format: float
 *                 description: Percentage of cacao in the chocolate
 *                 example: 70
 *               isVegan:
 *                 type: boolean
 *                 description: Indicates if the chocolate is vegan
 *                 example: true
 *               isOrganic:
 *                 type: boolean
 *                 description: Indicates if the chocolate is organic
 *                 example: false
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients in the chocolate
 *                 example: [ "Cocoa", "Sugar", "Vanilla" ]
 *     responses:
 *       200:
 *         description: Chocolate updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the chocolate
 *                   example: 60d0fe4f5311236168a109ca
 *                 name:
 *                   type: string
 *                   description: Name of the chocolate
 *                   example: Dark Delight
 *                 firmName:
 *                   type: string
 *                   description: Firm name
 *                   example: Choco Bliss Co.
 *                 description:
 *                   type: string
 *                   description: Description of the chocolate
 *                   example: A rich, dark chocolate bar with 70% cacao.
 *                 dateOfProduction:
 *                   type: string
 *                   format: date
 *                   description: Production date of the chocolate
 *                   example: 2025-01-01
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the chocolate
 *                   example: 4.99
 *                 netWeight:
 *                   type: number
 *                   format: float
 *                   description: Net weight of the chocolate
 *                   example: 100
 *                 cacaoPercentage:
 *                   type: number
 *                   format: float
 *                   description: Percentage of cacao in the chocolate
 *                   example: 70
 *                 isVegan:
 *                   type: boolean
 *                   description: Indicates if the chocolate is vegan
 *                   example: true
 *                 isOrganic:
 *                   type: boolean
 *                   description: Indicates if the chocolate is organic
 *                   example: false
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of ingredients in the chocolate
 *                   example: [ "Cocoa", "Sugar", "Vanilla" ]
 *       400:
 *         description: Bad request, validation error
 *       401:
 *         description: Unauthorized, JWT is missing or invalid
 *       404:
 *         description: Chocolate not found
 *       500:
 *         description: Internal server error
 */
chocolateRouter.put(
  "/:chocolateId",
  checkJwt,
  validation.params({
    chocolateId: Joi.string().hex().length(24).required(),
  }),
  validation.body({
    name: Joi.string().required(),
    firmName: Joi.string().required(),
    description: Joi.string().required(),
    dateOfProduction: Joi.date().required,
    price: Joi.number().required(),
    netWeight: Joi.number().required(),
    cacaoPercentage: Joi.number().required(),
    isVegan: Joi.boolean().required(),
    isOrganic: Joi.boolean().required(),
    ingredients: Joi.array().items(Joi.string()),
  }),
  chocolateController.updateChocolateById
);

/**
 * @swagger
 * /chocolates/{chocolateId}:
 *   delete:
 *     summary: Delete a specific chocolate by its ID
 *     tags: [Chocolate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chocolateId
 *         required: true
 *         description: The ID of the chocolate to delete
 *         schema:
 *           type: string
 *           format: hex
 *           minLength: 24
 *           maxLength: 24
 *           example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Chocolate deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: integer
 *                   description: The number of chocolates deleted
 *                   example: 1
 *       400:
 *         description: Invalid chocolate ID provided
 *       401:
 *         description: Unauthorized, JWT is missing or invalid
 *       404:
 *         description: Chocolate not found
 *       500:
 *         description: Internal server error
 */
chocolateRouter.delete(
  "/:chocolateId",
  checkJwt,
  validation.params({
    chocolateId: Joi.string().hex().length(24).required(),
  }),
  chocolateController.deleteChocolateById
);

export default chocolateRouter;
