import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function getAllUsers() {
  const users = await User.find({});
  return users;
}

async function getUsersById(userId) {
  const user = await User.findOne({ _id: userId });
  return user;
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

async function updateUserById(
  userId,
  username,
  firstName,
  lastName,
  email,
  role,
) {
  const updatedUserById = await User.findOneAndUpdate(
    { _id: userId },
    {
      username,
      firstName,
      lastName,
      email,
      role,
    },
    { new: true },
  );
  return updatedUserById;
}

export default {
  getAllUsers,
  getUserByUsername,
  createUser,
  createJwtToken,
  getPasswordHash,
  comparePasswordAndHash,
  updateUserById,
  getUsersById,
};
