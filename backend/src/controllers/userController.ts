import { Request, Response } from "express";
import prismaClient from "../prisma";
import bcrypt from "bcrypt";
import generateToken from "../utilis/generateToken";
import { generateResetToken, resetPassword } from "../services/tokenService";
import { sendPasswordResetEmail } from "../utilis/sendEmail";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getMe = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const token = await generateResetToken(email);
    await sendPasswordResetEmail(email, token);
    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.log("Error in requestPasswordReset controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const handlePasswordReset = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    console.log("newPassword", token, newPassword);

    await resetPassword(token, newPassword);
    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log("Error in handlePasswordReset controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
