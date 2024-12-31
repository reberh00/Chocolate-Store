import express, { response } from "express";
const purchaseRouter = express.Router();
import purchaseController from "../controllers/purchaseController.js";

purchaseRouter.get("/", purchaseController.getAllPurchases);
purchaseRouter.get("/:id", purchaseController.getPurchasesById);
purchaseRouter.post("/", purchaseController.createPurchase);
purchaseRouter.put("/:id", purchaseController.updatePurchaseById);
purchaseRouter.delete("/:id", purchaseController.deletePurchaseById);

export default purchaseRouter;
