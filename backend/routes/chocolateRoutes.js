import express, { response } from "express";
const chocolateRouter = express.Router();
import chocolateController from "../controllers/chocolateController.js";

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
chocolateRouter.get("/:id", chocolateController.getChocolatesById);

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
chocolateRouter.post("/", chocolateController.createChocolate);
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
chocolateRouter.put("/:id", chocolateController.updateChocolateById);

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
chocolateRouter.delete("/:id", chocolateController.deleteChocolateById);

export default chocolateRouter;
