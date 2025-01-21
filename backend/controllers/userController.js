import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "../services/userService.js";
dotenv.config();

const getAllUsers = async (request, response) => {
  try {
    const users = await userService.getAllUsers();
    return response.json(users);
  } catch (error) {
    return response.json(`Error in getting users: ${error}`);
  }
};

const register = async (request, response) => {
  const userData = request.body;
  try {
    const existingUser = await userService.getUserByUsername(userData.username);
    if (existingUser != undefined)
      throw new Error("User with this username already exists");

    const hashedPassword = await userService.getPasswordHash(userData.password);

    const newUser = await userService.createUser(
      userData.username,
      userData.firstName,
      userData.lastName,
      userData.email,
      hashedPassword,
      userData.role,
    );

    const jwtToken = await userService.createJwtToken(
      newUser.username,
      newUser.role,
      newUser.env.secret,
    );

    return response.json({
      token: jwtToken,
      username: newUser.username,
      firstName: newUser.firstName,
      role: newUser.role,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in register: ${validationErrors}`);
      return response.json(
        `Validation errors in register: ${validationErrors}`,
      );
    }
    return response.json(`Error in register:` + error.message);
  }
};

const login = async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  try {
    const existingUser = await userService.getUserByUsername(username);
    if (existingUser == undefined)
      throw new Error("User with this username doesn't exists");

    if (!userService.comparePasswordAndHash(password, existingUser.password))
      throw new Error("Password is incorrect");

    const jwtToken = await userService.createJwtToken(
      existingUser.username,
      existingUser.role,
      process.env.secret,
    );

    return response.json({
      token: jwtToken,
      username: existingUser.username,
      firstName: existingUser.firstName,
      role: existingUser.role,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in login: ${validationErrors}`);
      return response.json(`Validation errors in login: ${validationErrors}`);
    }
    return response.json(`Error in login: ` + error.message);
  }
};

export default {
  getAllUsers,
  register,
  login,
};
