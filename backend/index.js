import express, { request, response } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import manufacturerRouter from "./routes/manufacturerRoutes.js";
import chocolateRouter from "./routes/chocolateRoutes.js";
import logRequest from "./middlewares/logging.js";

import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", logRequest);

app.use("/manufacturers", manufacturerRouter);
app.use("/chocolates", chocolateRouter);
app.use("/users", userRouter);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Chocolate Store API",
      version: "1.0.0",
      description: "API documentation for Chocolate Store website",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose
  .connect(process.env.mongoDBURL)
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
