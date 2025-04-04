import { Router } from "express";
import {
  AddToCart,
  GetCart,
  RemoveFromCart,
} from "../controllers/cartController";
import authenticated from "../middleware/authenticated";

const cartRouter = Router();

cartRouter.post("/add-to-cart", authenticated, AddToCart);
cartRouter.get("/get-cart-items", authenticated, GetCart);
cartRouter.delete("/remove-from-cart", authenticated, RemoveFromCart);

export default cartRouter;
