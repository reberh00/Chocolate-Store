import Chocolate from "../models/Chocolate.js";
import mongoose from "mongoose";
import { chocolatesData } from "./chocolates.js";
import { manufacturersData } from "./manufacturers.js";
import { usersData } from "./users.js";
import userService from "../services/userService.js";
import Manufacturer from "../models/Manufacturer.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.mongoDBURL)
  .then(async () => {
    await Chocolate.collection.drop();

    for (const chocolateData of chocolatesData) {
      const chocolate = new Chocolate(chocolateData);
      await chocolate.save();
    }

    await Manufacturer.collection.drop();

    for (const manufacturerData of manufacturersData) {
      const manufacturer = new Manufacturer(manufacturerData);
      await manufacturer.save();
    }

    await User.collection.drop();

    for (const userData of usersData) {
      userData.password = await userService.getPasswordHash(
        userData.password,
        5,
      );

      const user = new User(userData);
      await user.save();
    }

    console.log("Script successfully seeded!:)");

    mongoose.disconnect();
  })
  .catch((error) => {
    console.log(error);
  });
