import { Router } from "express";
import {
  AddToCart,
  AddToCartItems,
  GetCart,
  RemoveFromCart,
} from "../controllers/cartController";
import authenticated from "../middleware/authenticated";

const cartRouter = Router();

cartRouter.post("/add-to-cart", authenticated, AddToCart);
cartRouter.post("/add-to-cart-items", authenticated, AddToCartItems);
cartRouter.get("/get-cart-items", authenticated, GetCart);
cartRouter.delete("/remove-from-cart", authenticated, RemoveFromCart);

export default cartRouter;
