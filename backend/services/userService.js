import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function getAllUsers() {
  const users = await User.find({});
  return users;
}

async function getUserByUsername(username) {
  const user = await User.findOne({ username });
  return user;
}

async function createUser(
  username,
  firstName,
  lastName,
  email,
  password,
  role,
) {
  const newUser = new User({
    username,
    firstName,
    lastName,
    email,
    password,
    role,
  });
  await newUser.save();
  return newUser;
}

async function createJwtToken(username, role, secret) {
  const jwtToken = jwt.sign(
    {
      username,
      role,
    },
    secret,
    { expiresIn: "48h" },
  );

  return jwtToken;
}

async function getPasswordHash(password) {
  return await bcrypt.hash(password, 5);
}

async function comparePasswordAndHash(password, passwordHash) {
  return await bcrypt.hash(password, 5);
}

export default {
  getAllUsers,
  getUserByUsername,
  createUser,
  createJwtToken,
  getPasswordHash,
  comparePasswordAndHash,
};
