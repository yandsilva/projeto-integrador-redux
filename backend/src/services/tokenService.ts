import prismaClient from "../prisma";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const generateResetToken = async (email: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = uuidv4();
  const expires = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 minutes

  await prismaClient.user.update({
    where: {
      email,
    },
    data: {
      resetToken: resetToken,
      resetTokenExpires: expires,
    },
  });
  return resetToken;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const user = await prismaClient.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });
};
