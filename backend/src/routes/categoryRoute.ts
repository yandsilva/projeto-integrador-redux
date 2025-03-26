import { Router } from "express";
import { addNewCategory } from "../controllers/productController";
import authenticated from "../middleware/authenticated";

const categoryRouter = Router();

// CATEGORIES
categoryRouter.post("/add", authenticated, addNewCategory);

export default categoryRouter;
