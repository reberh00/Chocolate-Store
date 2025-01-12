import express, { response } from "express";
const userRouter = express.Router();
import userController from "../controllers/userController.js";
import validation from "../middlewares/validation.js";
import Joi from "joi";

/**
 * @swagger
 *  tags:
 *    - name: User
 *      description: The User management API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The user's unique ID
 *                     example: 60d0fe4f5311236168a109cb
 *                   userName:
 *                     type: string
 *                     description: The user's username
 *                     example: john_doe
 *                   firstName:
 *                     type: string
 *                     description: The user's first name
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     description: The user's last name
 *                     example: Doe
 *                   email:
 *                     type: string
 *                     description: The user's email address
 *                     example: john.doe@example.com
 *       500:
 *         description: Internal server error
 */
userRouter.get("/", userController.getAllUsers);

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The user's chosen username
 *                 example: john_doe
 *               firstName:
 *                 type: string
 *                 description: The user's first name
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The user's last name
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: User created successfully and JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the authenticated user
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBkMGZlNGY1MzEyMzM2MTY4YTEwOWNiIiwiaWF0IjoxNjQwMzA0NjQyfQ.-fqX4jhjY7_7xlkqLvIu0UoybZ74k5HT2b0wXATaXYM"
 *       400:
 *         description: Validation error in request body
 *       409:
 *         description: User already exists (duplicate email or username)
 *       500:
 *         description: Internal server error
 */
userRouter.post(
  "/signup",
  validation.body({
    userName: Joi.string().min(5).required(),
    firstName: Joi.string().min(5).required(),
    lastName: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  userController.signUpUser,
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user and return a JWT token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The user's username
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: User logged in successfully and JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the authenticated user
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBkMGZlNGY1MzEyMzM2MTY4YTEwOWNiIiwiaWF0IjoxNjQwMzA0NjQyfQ.-fqX4jhjY7_7xlkqLvIu0UoybZ74k5HT2b0wXATaXYM"
 *       400:
 *         description: Validation error in request body
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */
userRouter.post(
  "/login",
  validation.body({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
  userController.logInUser,
);

export default userRouter;
