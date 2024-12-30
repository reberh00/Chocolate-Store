import express, { response } from "express";
const chocolateRouter = express.Router();
import chocolateController from "../controllers/chocolateController.js";

chocolateRouter.get("/", chocolateController.getAllChocolates);
chocolateRouter.get("/:id", chocolateController.getChocolatesById);
chocolateRouter.post("/", chocolateController.createChocolate);
chocolateRouter.put("/:id", chocolateController.updateChocolateById);
chocolateRouter.delete("/:id", chocolateController.deleteChocolateById);

export default chocolateRouter;
