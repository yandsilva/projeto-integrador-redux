import { Request, Response } from "express";
import prismaClient from "../prisma";

export const AddToCart = async (req: Request, res: Response): Promise<any> => {
  const { userId, productId } = req.body;
  try {
    const existingCart = await prismaClient.cart.findFirst({
      where: { userId: userId },
    });

    if (existingCart) {
      throw new Error("Cart already exists for the user");
    }

    const cart = await prismaClient.cart.create({
      data: {
        user: { connect: { id: userId } },
      },
      include: {
        CartItems: true,
      },
    });

    if (cart) {
      await prismaClient.cartItems.create({
        data: {
          cart: { connect: { id: cart.id } },
          product: { connect: { id: productId } },
          quantity: 1,
        },
      });
    }

    return res.status(201).json({
      message: "Product added to cart successfully",
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Error in AddToCart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const AddToCartItems = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { cartId, productId } = req.body;
  try {
    const existingCart = await prismaClient.cartItems.findFirst({
      where: { productId: productId },
    });

    if (existingCart) {
      throw new Error("Cart already exists for the user");
    }

    const cart = await prismaClient.cartItems.create({
      data: {
        cart: { connect: { id: cartId } },
        product: { connect: { id: productId } },
        quantity: 1,
      },
    });
    return res.status(201).json({
      message: "Product added to cart successfully",
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Error in AddToCart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetCart = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.body;
  try {
    const cart = await prismaClient.cart.findFirst({
      where: { userId: userId },
      include: {
        CartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    return res.status(201).json({
      message: "Product added to cart successfully",
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Error in AddToCart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const RemoveFromCart = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { cartId, productId } = req.body;
    const cartItem = await prismaClient.cartItems.findFirst({
      where: { cartId: cartId, productId: productId },
    });

    if (cartItem) {
      await prismaClient.cartItems.delete({
        where: { id: cartItem.productId },
      });
      return res.status(200).json({
        message: "Product removed from cart successfully",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Product not found in cart",
        success: false,
      });
    }
  } catch (error) {}
};
