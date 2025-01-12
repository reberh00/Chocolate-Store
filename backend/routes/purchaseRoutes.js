import express, { response } from "express";
import checkJwt from "../middlewares/validateJwtToken.js";
const purchaseRouter = express.Router();
import purchaseController from "../controllers/purchaseController.js";

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
purchaseRouter.get("/:id", purchaseController.getPurchasesById);

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
purchaseRouter.post("/", checkJwt, purchaseController.createPurchase);

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
purchaseRouter.put("/:id", checkJwt, purchaseController.updatePurchaseById);

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
purchaseRouter.delete("/:id", checkJwt, purchaseController.deletePurchaseById);

export default purchaseRouter;
