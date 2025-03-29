import { Router } from "express";
import {
  login,
  logout,
  signup,
  getMe,
  requestPasswordReset,
  handlePasswordReset,
} from "../controllers/userController";
import authenticated from "../middleware/authenticated";

const userRoute = Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.get("/me", authenticated, getMe);
userRoute.get("/logout", authenticated, logout);
userRoute.post("/password/forgot", requestPasswordReset);
userRoute.put("/password/reset/:token", handlePasswordReset);

export default userRoute;
