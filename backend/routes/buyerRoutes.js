import express, { response } from "express";
const buyerRouter = express.Router();
import Buyer from "../models/Buyers.js";
import buyerController from "../controllers/buyerController.js";

buyerRouter.get("/", buyerController.getAllBuyers);
buyerRouter.get("/:id", buyerController.getBuyersById);
buyerRouter.post("/", buyerController.createBuyer);
buyerRouter.put("/:id", buyerController.updateBuyerById);
buyerRouter.delete("/:id", buyerController.deleteBuyerById);

export default buyerRouter;
