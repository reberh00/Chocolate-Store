import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import Buyer from "./models/Buyers.js";
import buyerRouter from "./routes/buyerRoutes.js";

import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/buyers", buyerRouter);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack tutorial");
});

app.get("/CreateBuyer", async (request, response) => {
  const BioBio = new Buyer({
    firmName: "Bio&Bio",
    firmAddress: "Whatever123,Split",
    description: "If its good, we buy",
    dateEstablished: "1911-02-13",
    netWorth: 15000000000,
    countriesOfInterest: [
      "Argentina",
      "Canada",
      "Croatia",
      "Germany",
      "Poland",
      "Portugal",
      "Spain",
      "Venezuela",
    ],
  });

  await BioBio.save();
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
