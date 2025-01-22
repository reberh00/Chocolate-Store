import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function getAllUsers() {
  const users = await User.find({});
  return users;
}

async function getUserByUserName(userName) {
  const user = await User.findOne({ userName });
  return user;
}

async function createUser(
  userName,
  firstName,
  lastName,
  email,
  password,
  role,
) {
  const newUser = new User({
    userName,
    firstName,
    lastName,
    email,
    password,
    role,
  });
  await newUser.save();
  return newUser;
}

async function createJwtToken(userName, role, secret) {
  const jwtToken = jwt.sign(
    {
      userName,
      role,
    },
    secret,
    { expiresIn: "3h" },
  );

  return jwtToken;
}

async function getPasswordHash(password, saltRounds) {
  return await bcrypt.hash(password, saltRounds);
}

export default {
  getAllUsers,
  getUserByUserName,
  createUser,
  createJwtToken,
  getPasswordHash,
};
