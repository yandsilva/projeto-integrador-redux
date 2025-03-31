import { Router } from "express";
import authenticated from "../middleware/authenticated";
import {
  createAddress,
  deleteAddress,
  searchAddress,
  updateAddress,
} from "../controllers/addressController";

const addressRoute = Router();

addressRoute.post("/register", authenticated, createAddress);
addressRoute.get("/getAddress", authenticated, searchAddress);
addressRoute.put("/updataAddress/:id", authenticated, updateAddress);
addressRoute.delete("/deleteAddress/:id", authenticated, deleteAddress);

export default addressRoute;
