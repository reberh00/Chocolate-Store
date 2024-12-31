import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import buyerRouter from "./routes/buyerRoutes.js";
import chocolateRouter from "./routes/chocolateRoutes.js";
import purchaseRouter from "./routes/purchaseRoutes.js";

import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Chocolate Store API",
      version: "1.0.0",
      description: "API documentation for Chocolate Store website",
    },
    // servers: [
    //   {
    //     url: "http://localhost:3000",
    //   },
    // ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
