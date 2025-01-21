import express, { response } from "express";
const userRouter = express.Router();
import userController from "../controllers/userController.js";
import validation from "../middlewares/validation.js";
import Joi from "joi";

userRouter.get("/", userController.getAllUsers);

userRouter.post(
  "/register",
  validation.body({
    username: Joi.string().min(5).required(),
    firstName: Joi.string().min(5).required(),
    lastName: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string(),
  }),
  userController.register,
);

userRouter.post(
  "/login",
  validation.body({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  userController.login,
);

export default userRouter;
