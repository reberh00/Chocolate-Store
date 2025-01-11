import express, { response } from "express";
const purchaseRouter = express.Router();
import purchaseController from "../controllers/purchaseController.js";
import validation from "../middlewares/validation.js";
import Joi from "joi";

/**
 * @swagger
 *  tags:
 *    - name: Purchase
 *      description: The Purchase management API
 */

/**
 * @swagger
 *  /purchases:
 *    get:
 *      tags: [Purchase]
 *      summary: Retrieve a list of all Purchases
 *      responses:
 *        200:
 *          description: Return list of all Purchases
 */
purchaseRouter.get("/", purchaseController.getAllPurchases);

/**
 * @swagger
 *  /purchases/{id}:
 *    get:
 *      summary: Retrieve a Purchase
 *      tags: [Purchase]
 *      parameters:
 *        - name: id
 *          description: The Purchase id
 *          in: path
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Return single Purchase
 */
purchaseRouter.get(
  "/:purchaseId",
  validation.params({
    purchaseId: Joi.string().hex().length(24).required(),
  }),
  purchaseController.getPurchasesById,
);

/**
 * @swagger
 *  /purchases:
 *    post:
 *      summary: Create a new Purchase
 *      tags: [Purchase]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - buyerId
 *                - chocolateId
 *                - date
 *                - amount
 *              properties:
 *                buyerId:
 *                  type: string
 *                chocolateId:
 *                  type: string
 *                date:
 *                  type: string
 *                amount:
 *                  type: number
 *      responses:
 *        200:
 *          description: Return created Purchase
 */
purchaseRouter.post(
  "/",
  validation.body({
    buyerId: Joi.string().hex().length(24).required(),
    chocolateId: Joi.string().hex().length(24).required(),
    date: Joi.date().required(),
    amount: Joi.number().positive(),
  }),
  purchaseController.createPurchase,
);

/**
 * @swagger
 *  /purchases/{id}:
 *    put:
 *      summary: Update a Purchase
 *      tags: [Purchase]
 *      parameters:
 *        - name: id
 *          description: The Purchase id
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
 *                buyerId:
 *                  type: string
 *                chocolateId:
 *                  type: string
 *                date:
 *                  type: string
 *                amount:
 *                  type: number
 *      responses:
 *        200:
 *          description: Return updated Purchase
 */
purchaseRouter.put(
  "/:purchaseId",
  validation.params({
    purchaseId: Joi.string().hex().length(24).required(),
  }),
  validation.body({
    buyerId: Joi.string().hex().length(24).required(),
    chocolateId: Joi.string().hex().length(24).required(),
    date: Joi.date().required(),
    amount: Joi.number().positive(),
  }),
  purchaseController.updatePurchaseById,
);

/**
 * @swagger
 *  /purchases/{id}:
 *    delete:
 *      summary: Delete a Purchase by id
 *      tags: [Purchase]
 *      parameters:
 *        - name: id
 *          description: The Purchase id
 *          in: path
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: The number of deleted Purchases
 */
purchaseRouter.delete(
  "/:purchaseId",
  validation.params({ purchaseId: Joi.string().hex().length(24).required() }),
  purchaseController.deletePurchaseById,
);

export default purchaseRouter;
