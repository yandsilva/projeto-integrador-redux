import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true, // prevent XSS cross site scripting
    sameSite: "strict", // prevent CSRF cross site request forgery
    secure: process.env.NODE_ENV === "production", // HTTP
  });
};

export default generateToken;
