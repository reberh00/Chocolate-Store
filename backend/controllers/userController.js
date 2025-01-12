import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import userService from "../services/userService.js";

const getAllUsers = async (request, response) => {
  try {
    const users = await userService.getAllUsers();
    return response.json(users);
  } catch (error) {
    return response.json(`Error in getting users: ${error}`);
  }
};

const signUpUser = async (request, response) => {
  const userData = request.body;
  try {
    const existingUserName = await userService.getUserByUserName(
      userData.userName,
    );
    if (existingUserName != undefined)
      throw new Error("User with this username already exists");

    const hashedPassword = await bcrypt.hash(newUser.password, 5);
    newUser.password = hashedPassword;

    const user = await userService.createUser(
      userData.userName,
      userData.firstName,
      userData.lastName,
      userData.email,
      hashedPassword,
    );

    const jwtToken = userService.createJwtToken(userName, process.env.secret);

    return response.json(jwtToken);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in signUpUser: ${validationErrors}`);
      return response.json(
        `Validation errors in signUpUser: ${validationErrors}`,
      );
    }
    return response.json(`Error in signUpUser:` + error.message);
  }
};

const logInUser = async (request, response) => {
  const userName = request.body.userName;
  const password = request.body.password;
  try {
    const existingUserName = await userService.getUserByUserName(
      userData.userName,
    );
    if (existingUserName == undefined)
      throw new Error("User with this username doesn't exists");

    if (!bcrypt.compareSync(password, existingUserName.password))
      throw new Error("Password is wrong");

    const jwtToken = userService.createJwtToken(userName, process.env.secret);

    return response.json(jwtToken);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in logInUser: ${validationErrors}`);
      return response.json(
        `Validation errors in logInUser: ${validationErrors}`,
      );
    }
    return response.json(`Error in logInUser: ` + error.message);
  }
};

export default {
  getAllUsers,
  signUpUser,
  logInUser,
};
