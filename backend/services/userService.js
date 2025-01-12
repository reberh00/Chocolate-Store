import User from "../models/User.js";
import jwt from "jsonwebtoken";

async function getAllUsers() {
  const users = await User.find({});
  return users;
}

async function getUserByUserName(userName) {
  const user = await User.find({ userName });
  return user;
}

async function createUser(userName, firstName, lastName, email, password) {
  const newUser = new User(userName, firstName, lastName, email, password);
  await newUser.save();
  return newUser;
}

async function createJwtToken(userName, secret) {
  const jwtToken = jwt.sign(
    {
      userName,
    },
    secret,
    { expiresIn: "1h" },
  );

  return jwtToken;
}

export default {
  getAllUsers,
  getUserByUserName,
  createUser,
  createJwtToken,
};
