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

userRouter.get(
  "/:userId",
  validation.params({
    userId: Joi.string().hex().length(24).required(),
  }),
  userController.getUsersById,
);

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
  userController.signUpUser,
);

userRouter.post(
  "/login",
  validation.body({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
  userController.logInUser,
);

userRouter.put(
  "/:userId",
  checkJwt,
  validation.params({
    userId: Joi.string().hex().length(24).required(),
  }),
  validation.body({
    userName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().required(),
  }),
  userController.updateUserById,
);

export default userRouter;
