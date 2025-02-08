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
      userData.userName
    );
    if (existingUserName != undefined)
      throw new Error("User with this username already exists");

    const hashedPassword = await userService.getPasswordHash(
      userData.password,
      5
    );

    await userService.createUser(
      userData.userName,
      userData.firstName,
      userData.lastName,
      userData.email,
      hashedPassword,
      userData.role
    );

    const jwtToken = await userService.createJwtToken(
      userData.userName,
      "user",
      process.env.secret
    );

    return response.json({ token: jwtToken });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in signUpUser: ${validationErrors}`);
      return response.json(
        `Validation errors in signUpUser: ${validationErrors}`
      );
    }
    return response.json(`Error in signUpUser:` + error.message);
  }
};

const logInUser = async (request, response) => {
  const userName = request.body.userName;
  const password = request.body.password;
  try {
    const existingUserName = await userService.getUserByUserName(userName);
    if (existingUserName == undefined)
      throw new Error("User with this username doesn't exists");

    if (!bcrypt.compareSync(password, existingUserName.password))
      throw new Error("Password is wrong");

    const jwtToken = await userService.createJwtToken(
      userName,
      existingUserName.role,
      process.env.secret
    );

    return response.json({ token: jwtToken });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in logInUser: ${validationErrors}`);
      return response.json(
        `Validation errors in logInUser: ${validationErrors}`
      );
    }
    return response.json(`Error in logInUser: ` + error.message);
  }
};

const changeUserPassword = async (request, response) => {
  console.log("We're in;)");
  const userName = request.params.userName;
  const password = request.body.password;
  const newPassword = request.body.newPassword;

  try {
    if (response.locals.user.userName != userName)
      throw new Error("You are not logged in with this username");

    const existingUser = await userService.getUserByUserName(userName);

    if (!bcrypt.compareSync(password, existingUser.password))
      throw new Error("Password is wrong");

    const hashedPassword = await userService.getPasswordHash(newPassword, 5);

    await userService.updateUserPassword(userName, hashedPassword);

    return response.json("Successfully changed password!");
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in logInUser: ${validationErrors}`);
      return response.json(
        `Validation errors in logInUser: ${validationErrors}`
      );
    }
    return response.json(`Error in logInUser: ` + error.message);
  }
};

export default {
  getAllUsers,
  signUpUser,
  logInUser,
  changeUserPassword,
};
