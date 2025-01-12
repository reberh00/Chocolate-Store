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

userRouter.get("/", userController.getAllUsers);

userRouter.post(
  "/signup",
  validation.body({
    userName: Joi.string().min(5).required(),
    firstName: Joi.string().min(5).required(),
    lastName: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  userController.signUpUser
);

userRouter.post(
  "/login",
  validation.body({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
  userController.logInUser
);

export default userRouter;
