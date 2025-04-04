import { Router } from "express";
import multer from "multer";
import {
  addNewProduct,
  deleteProduct,
  getAllProduct,
} from "../controllers/productController";
import uploadsConfig from "../config/multer";
import authenticated from "../middleware/authenticated";

const uploads = multer(uploadsConfig);

const productRouter = Router();

// PRODUCTS
productRouter.post(
  "/add",
  authenticated,
  uploads.array("images", 5),
  addNewProduct
);
productRouter.get("/getall", getAllProduct);
productRouter.delete("/delete/:id", authenticated, deleteProduct);

export default productRouter;
