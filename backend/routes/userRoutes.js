import express, { response } from "express";
const userRouter = express.Router();
import userController from "../controllers/userController.js";

/**
 * @swagger
 *  tags:
 *    - name: User
 *      description: The User management API
 */

/**
 * @swagger
 *  /buyers:
 *    get:
 *      tags: [User]
 *      summary: Retrieve a list of all Users
 *      responses:
 *        200:
 *          description: Return list of all Users
 */
userRouter.get("/", userController.getAllUsers);

/**
 * @swagger
 *  /users:
 *    post:
 *      summary: Sign up a new User
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - userName
 *                - firstName
 *                - lastName
 *                - email
 *                - password
 *              properties:
 *                userName:
 *                  type: string
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        200:
 *          description: Return created User
 */
userRouter.post("/", userController.signUpUser);

userRouter.post("/login", userController.logInUser);

export default userRouter;
