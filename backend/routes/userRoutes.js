import express, { response } from "express";
const userRouter = express.Router();
import userController from "../controllers/userController.js";
import validation from "../middlewares/validation.js";
import checkJwt from "../middlewares/validateJwtToken.js";
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
    role: Joi.string(),
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

userRouter.put(
  "/changepwd/:userName",
  checkJwt,
  validation.body({
    password: Joi.string().required(),
    newPassword: Joi.string().min(4).required(),
  }),
  validation.params({
    userName: Joi.string().required(),
  }),
  userController.changeUserPassword
);

export default userRouter;
