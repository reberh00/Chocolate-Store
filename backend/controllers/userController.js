import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { secret } from "../config.js";
import jwt from "jsonwebtoken";

const getAllUsers = async (request, response) => {
  try {
    const users = await User.find({});
    return response.json(users);
  } catch (error) {
    return response.json(`Error in getting Users: ${error}`);
  }
};

const signUpUser = async (request, response) => {
  const userData = request.body;
  try {
    const newUser = new User({
      ...userData,
    });
    const existingUserName = await User.findOne({ userName: newUser.userName });
    if (existingUserName != undefined)
      throw new Error("User with this username already exists");

    const hashedPassword = await bcrypt.hash(newUser.password, 5);
    newUser.password = hashedPassword;

    const jwtToken = jwt.sign(
      {
        userName: newUser.userName,
      },
      secret,
      { expiresIn: "1h" }
    );

    await newUser.save();
    return response.json(jwtToken);
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
    const existingUser = await User.findOne({ userName: userName });
    if (existingUser == undefined)
      throw new Error("User with this username doesn't exists");

    if (!bcrypt.compareSync(password, existingUser.password))
      throw new Error("Password is wrong");

    const jwtToken = jwt.sign(
      {
        userName: logInUser.userName,
      },
      secret,
      { expiresIn: "1h" }
    );

    return response.json(jwtToken);
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
};
