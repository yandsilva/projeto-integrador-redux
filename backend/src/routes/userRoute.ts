import { Router } from "express";
import { login, logout, signup, getMe } from "../controllers/userController";
import authenticated from "../middleware/authenticated";

const userRoute = Router();

userRoute.get("/me", authenticated, getMe);
userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.get("/logout", authenticated, logout);

export default userRoute;
