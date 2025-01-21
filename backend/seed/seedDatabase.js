import dotenv from "dotenv";
import mongoose from "mongoose";
import { origamis } from "./origamis.js";
import { artists } from "./artists.js";
import { users } from "./users.js";
import Origami from "../models/Origami.js";
import Artist from "../models/Artist.js";
import User from "../models/User.js";
import userService from "../services/userService.js";
dotenv.config();

mongoose
  .connect(process.env.mongoDBURL, {
    dbName: "napredne_mijo",
  })
  .then(async () => {
    await Artist.collection.drop();
    console.log("Script dropped Artist");

    for (const artistData of artists) {
      const artist = new Artist(artistData);
      await artist.save();
      console.log(`\t Artist ${artist.firstName} seeded`);
    }
    console.log("Script seeded Artist");

    await Origami.collection.drop();
    console.log("Script dropped Origami");

    for (const origamiData of origamis) {
      const origami = new Origami(origamiData);
      await origami.save();
      console.log(`\t Origami ${origami.name} seeded`);
    }
    console.log("Script seeded Origami");

    await User.collection.drop();
    console.log("Script dropped User");

    for (const userData of users) {
      userData.password = await userService.getPasswordHash(userData.password);

      const user = new User(userData);
      await user.save();
      console.log(`\t User ${user.username} seeded`);
    }
    console.log("Script seeded User");

    console.log("Script finished");

    mongoose.disconnect();
  })
  .catch((error) => {
    console.log(error);
  });
