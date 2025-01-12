import express, { response } from "express";
import checkJwt from "../middlewares/validateJwtToken.js";
const buyerRouter = express.Router();
import buyerController from "../controllers/buyerController.js";

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
buyerRouter.get("/:id", buyerController.getBuyersById);

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
buyerRouter.post("/", checkJwt, buyerController.createBuyer);

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
buyerRouter.put("/:id", checkJwt, buyerController.updateBuyerById);

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
buyerRouter.delete("/:id", checkJwt, buyerController.deleteBuyerById);

export default buyerRouter;
