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
 *  /chocolates:
 *    get:
 *      tags: [Chocolate]
 *      summary: Retrieve a list of all Chocolates
 *      responses:
 *        200:
 *          description: Return list of all Chocolates
 */
chocolateRouter.get("/", chocolateController.getAllChocolates);

/**
 * @swagger
 *  /chocolates/{id}:
 *    get:
 *      summary: Retrieve a Chocolate
 *      tags: [Chocolate]
 *      parameters:
 *        - name: id
 *          description: The Chocolate id
 *          in: path
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Return single Chocolate
 */
chocolateRouter.get(
  "/:chocolateId",
  validation.params({
    chocolateId: Joi.string().hex().length(24).required(),
  }),
  chocolateController.getChocolatesById,
);

/**
 * @swagger
 *  /chocolates:
 *    post:
 *      summary: Create a new Chocolate
 *      tags: [Chocolate]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - firmName
 *                - description
 *                - dateOfProduction
 *                - price
 *                - netWeight
 *                - cacaoPercentage
 *                - isVegan
 *                - isOrganic
 *                - ingredients
 *              properties:
 *                name:
 *                  type: string
 *                firmName:
 *                  type: string
 *                description:
 *                  type: string
 *                dateOfProduction:
 *                  type: string
 *                price:
 *                  type: number
 *                netWeight:
 *                  type: number
 *                cacaoPercentage:
 *                  type: number
 *                isVegan:
 *                  type: boolean
 *                isOrganic:
 *                  type: boolean
 *                ingredients:
 *                  type: array
 *                  items:
 *                    type: string
 *      responses:
 *        200:
 *          description: Return created Chocolate
 */
chocolateRouter.post(
  "/",
  checkJwt,
  validation.body({
    name: Joi.string().required(),
    firmName: Joi.string().required(),
    description: Joi.string().required(),
    dateOfProduction: Joi.date().required(),
    price: Joi.number().positive().required(),
    netWeight: Joi.number().positive().required(),
    cacaoPercentage: Joi.number().positive().required(),
    isVegan: Joi.boolean().required(),
    isOrganic: Joi.boolean().required(),
    ingredients: Joi.array().items(Joi.string()),
    imageUrl: Joi.string().required(),
    manufacturerId: Joi.string().hex().length(24).required(),
  }),
  chocolateController.createChocolate,
);
/**
 * @swagger
 *  /chocolates/{id}:
 *    put:
 *      summary: Update a Chocolate
 *      tags: [Chocolate]
 *      parameters:
 *        - name: id
 *          description: The Chocolate id
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
 *                name:
 *                  type: string
 *                firmName:
 *                  type: string
 *                description:
 *                  type: string
 *                dateOfProduction:
 *                  type: string
 *                price:
 *                  type: number
 *                netWeight:
 *                  type: number
 *                cacaoPercentage:
 *                  type: number
 *                isVegan:
 *                  type: boolean
 *                isOrganic:
 *                  type: boolean
 *                ingredients:
 *                  type: array
 *                  items:
 *                    type: string
 *      responses:
 *        200:
 *          description: Return updated Chocolate
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
    dateOfProduction: Joi.date().required(),
    price: Joi.number().required(),
    netWeight: Joi.number().required(),
    cacaoPercentage: Joi.number().required(),
    isVegan: Joi.boolean().required(),
    isOrganic: Joi.boolean().required(),
    ingredients: Joi.array().items(Joi.string()),
    imageUrl: Joi.string().required(),
    manufacturerId: Joi.string().hex().length(24).required(),
  }),
  chocolateController.updateChocolateById,
);

/**
 * @swagger
 *  /chocolates/{id}:
 *    delete:
 *      summary: Delete a Chocolate by id
 *      tags: [Chocolate]
 *      parameters:
 *        - name: id
 *          description: The Chocolate id
 *          in: path
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: The number of deleted Chocolates
 */
chocolateRouter.delete(
  "/:chocolateId",
  checkJwt,
  validation.params({
    chocolateId: Joi.string().hex().length(24).required(),
  }),
  chocolateController.deleteChocolateById,
);

export default chocolateRouter;
