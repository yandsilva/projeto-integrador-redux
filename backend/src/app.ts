import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute";
import addressRoute from "./routes/addressRoute";
import productRouter from "./routes/productRoute";
import path from "path";

const app = express();
dotenv.config({ path: ".env" });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/product", productRouter);
app.use("/images", express.static(path.join(__dirname, "uploads")));

export default app;
