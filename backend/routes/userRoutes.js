import express, { response } from "express";
const userRouter = express.Router();
import userController from "../controllers/userController.js";

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
userRouter.get("/", userController.getAllUsers);

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
userRouter.post("/", userController.signUpUser);

userRouter.post("/login", userController.logInUser);

export default userRouter;
