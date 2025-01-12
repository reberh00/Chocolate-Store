import express, { response } from "express";
import checkJwt from "../middlewares/validateJwtToken.js";
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
 * /purchases/:
 *   get:
 *     summary: Retrieve a list of all purchases
 *     tags: [Purchase]
 *     responses:
 *       200:
 *         description: A list of all purchases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the purchase
 *                     example: 60d0fe4f5311236168a109ce
 *                   buyerId:
 *                     type: string
 *                     description: ID of the buyer
 *                     example: 60d0fe4f5311236168a109cb
 *                   chocolateId:
 *                     type: string
 *                     description: ID of the purchased chocolate
 *                     example: 60d0fe4f5311236168a109cd
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: The date of the purchase
 *                     example: 2025-01-12
 *                   amount:
 *                     type: number
 *                     description: The amount of chocolate purchased
 *                     example: 50
 *       500:
 *         description: Internal server error
 */
purchaseRouter.get("/", purchaseController.getAllPurchases);

/**
 * @swagger
 * /purchases/{purchaseId}:
 *   get:
 *     summary: Retrieve a specific purchase by its ID
 *     tags: [Purchase]
 *     parameters:
 *       - in: path
 *         name: purchaseId
 *         required: true
 *         description: The ID of the purchase to retrieve
 *         schema:
 *           type: string
 *           format: hex
 *           minLength: 24
 *           maxLength: 24
 *           example: 60d0fe4f5311236168a109ce
 *     responses:
 *       200:
 *         description: Details of the requested purchase
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the purchase
 *                   example: 60d0fe4f5311236168a109ce
 *                 buyerId:
 *                   type: string
 *                   description: ID of the buyer
 *                   example: 60d0fe4f5311236168a109cb
 *                 chocolateId:
 *                   type: string
 *                   description: ID of the purchased chocolate
 *                   example: 60d0fe4f5311236168a109cd
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: The date of the purchase
 *                   example: 2025-01-12
 *                 amount:
 *                   type: number
 *                   description: The amount of chocolate purchased
 *                   example: 50
 *       400:
 *         description: Invalid purchase ID provided
 *       404:
 *         description: Purchase not found
 *       500:
 *         description: Internal server error
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
 * /purchases/:
 *   post:
 *     summary: Create a new purchase
 *     tags: [Purchase]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyerId:
 *                 type: string
 *                 description: The ID of the buyer making the purchase
 *                 example: 60d0fe4f5311236168a109cb
 *               chocolateId:
 *                 type: string
 *                 description: The ID of the chocolate being purchased
 *                 example: 60d0fe4f5311236168a109cd
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the purchase
 *                 example: 2025-01-12
 *               amount:
 *                 type: number
 *                 description: The amount of chocolate purchased
 *                 example: 50
 *     responses:
 *       201:
 *         description: Purchase created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the created purchase
 *                   example: 60d0fe4f5311236168a109ce
 *                 buyerId:
 *                   type: string
 *                   description: The ID of the buyer
 *                   example: 60d0fe4f5311236168a109cb
 *                 chocolateId:
 *                   type: string
 *                   description: The ID of the purchased chocolate
 *                   example: 60d0fe4f5311236168a109cd
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: The date of the purchase
 *                   example: 2025-01-12
 *                 amount:
 *                   type: number
 *                   description: The amount of chocolate purchased
 *                   example: 50
 *       400:
 *         description: Validation error in request body
 *       401:
 *         description: Unauthorized, JWT is missing or invalid
 *       404:
 *         description: Buyer or chocolate not found
 *       500:
 *         description: Internal server error
 */
purchaseRouter.post(
  "/",
  checkJwt,
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
 * /purchases/{purchaseId}:
 *   put:
 *     summary: Update a specific purchase by its ID
 *     tags: [Purchase]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: purchaseId
 *         required: true
 *         description: The ID of the purchase to update
 *         schema:
 *           type: string
 *           format: hex
 *           minLength: 24
 *           maxLength: 24
 *           example: 60d0fe4f5311236168a109ce
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyerId:
 *                 type: string
 *                 description: The ID of the buyer
 *                 example: 60d0fe4f5311236168a109cb
 *               chocolateId:
 *                 type: string
 *                 description: The ID of the purchased chocolate
 *                 example: 60d0fe4f5311236168a109cd
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the purchase
 *                 example: 2025-01-12
 *               amount:
 *                 type: number
 *                 description: The amount of chocolate purchased
 *                 example: 50
 *     responses:
 *       200:
 *         description: Purchase updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the purchase
 *                   example: 60d0fe4f5311236168a109ce
 *                 buyerId:
 *                   type: string
 *                   description: ID of the buyer
 *                   example: 60d0fe4f5311236168a109cb
 *                 chocolateId:
 *                   type: string
 *                   description: ID of the purchased chocolate
 *                   example: 60d0fe4f5311236168a109cd
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: The date of the purchase
 *                   example: 2025-01-12
 *                 amount:
 *                   type: number
 *                   description: The amount of chocolate purchased
 *                   example: 50
 *       400:
 *         description: Validation error in request body
 *       401:
 *         description: Unauthorized, JWT is missing or invalid
 *       404:
 *         description: Purchase not found
 *       500:
 *         description: Internal server error
 */
purchaseRouter.put(
  "/:purchaseId",
  checkJwt,
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
 * /purchases/{purchaseId}:
 *   delete:
 *     summary: Delete a specific purchase by its ID
 *     tags: [Purchase]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: purchaseId
 *         required: true
 *         description: The ID of the purchase to delete
 *         schema:
 *           type: string
 *           format: hex
 *           minLength: 24
 *           maxLength: 24
 *           example: 60d0fe4f5311236168a109ce
 *     responses:
 *       200:
 *         description: Purchase deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: integer
 *                   description: The number of purchases deleted
 *                   example: 1
 *       400:
 *         description: Invalid purchase ID provided
 *       401:
 *         description: Unauthorized, JWT is missing or invalid
 *       404:
 *         description: Purchase not found
 *       500:
 *         description: Internal server error
 */
purchaseRouter.delete(
  "/:purchaseId",
  checkJwt,
  validation.params({ purchaseId: Joi.string().hex().length(24).required() }),
  purchaseController.deletePurchaseById,
);

export default purchaseRouter;
