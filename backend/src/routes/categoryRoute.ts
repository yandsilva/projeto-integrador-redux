import { Router } from "express";
import {
  addNewCategory,
  getAllCategories,
} from "../controllers/productController";
import authenticated from "../middleware/authenticated";

const categoryRouter = Router();

// CATEGORIES
categoryRouter.post("/add", authenticated, addNewCategory);
categoryRouter.get("/getall", getAllCategories);

export default categoryRouter;
