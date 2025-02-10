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

async function updateUserById(
  userId,
  userName,
  firstName,
  lastName,
  email,
  role,
) {
  const updatedUserById = await User.findOneAndUpdate(
    { _id: userId },
    {
      userName,
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
  getUsersById,
  getUserByUserName,
  createUser,
  createJwtToken,
  getPasswordHash,
  updateUserById,
};
