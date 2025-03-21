import { Router } from "express";
import multer from "multer";
import { addNewProduct } from "../controllers/productController";
import uploadsConfig from "../config/multer";

const uploads = multer(uploadsConfig);

const productRouter = Router();

productRouter.post("/add", uploads.array("images", 5), addNewProduct);

export default productRouter;
