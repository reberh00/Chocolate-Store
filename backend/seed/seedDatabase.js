import Chocolate from "../models/Chocolate.js";
import mongoose from "mongoose";
import { chocolatesData } from "./chocolates.js";
import { buyersData } from "./buyers.js";
import { purchasesData } from "./purchases.js";
import { usersData } from "./users.js";
import Buyer from "../models/Buyer.js";
import Purchase from "../models/Purchase.js";
import userService from "../services/userService.js";
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

    await Buyer.collection.drop();

    for (const buyerData of buyersData) {
      const buyer = new Buyer(buyerData);
      await buyer.save();
    }

    await Purchase.collection.drop();

    for (const purchaseData of purchasesData) {
      const purchase = new Purchase(purchaseData);
      await purchase.save();
    }

    await User.collection.drop();

    for (const userData of usersData) {
      userData.password = await userService.getPasswordHash(
        userData.password,
        5
      );

      const user = new User(userData);
      await user.save();
    }

    mongoose.disconnect();
  })
  .catch((error) => {
    console.log(error);
  });
