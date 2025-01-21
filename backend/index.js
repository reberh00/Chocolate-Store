import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import logRequest from "./middlewares/logging.js";

import artistRouter from "./routes/artistRoutes.js";
import origamiRouter from "./routes/origamiRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", logRequest);

app.use("/users", userRouter);
app.use("/origamis", origamiRouter);
app.use("/artists", artistRouter);

mongoose
  .connect(process.env.mongoDBURL, {
    dbName: "napredne_mijo",
  })
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
