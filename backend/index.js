import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import buyerRouter from "./routes/buyerRoutes.js";
import chocolateRouter from "./routes/chocolateRoutes.js";
import purchaseRouter from "./routes/purchaseRoutes.js";

import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/buyers", buyerRouter);
app.use("/chocolates", chocolateRouter);
app.use("/purchases", purchaseRouter);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack tutorial");
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
