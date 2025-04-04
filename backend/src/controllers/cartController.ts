import { Request, Response } from "express";
import { Cart, CartItems, Product } from "@prisma/client";
import prismaClient from "../prisma";

interface AddToCartRequestBody {
  userId: string;
  productId: string;
}

interface CartWithItems extends Cart {
  CartItems: (CartItems & { product: Product })[];
}

export const AddToCart = async (req: Request, res: Response): Promise<void> => {
  const { userId, productId } = req.body as AddToCartRequestBody;

  try {
    // Validar productId
    const product = await prismaClient.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    let cart: CartWithItems | null = await prismaClient.cart.findFirst({
      where: { userId },
      include: {
        CartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      // Criar novo carrinho com primeiro item
      const newCart = await prismaClient.cart.create({
        data: {
          user: { connect: { id: userId } },
          totalPrice: "0", // Valor temporário
        },
      });

      // Adicionar item ao carrinho
      await prismaClient.cartItems.create({
        data: {
          cartId: newCart.id,
          productId,
          quantity: 1,
          price: product.price,
        },
      });

      // Atualizar preço total
      cart = await updateCartTotal(newCart.id);
    } else {
      // Verificar se o produto já está no carrinho
      const existingItem = cart.CartItems.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        // Incrementar quantidade
        await prismaClient.cartItems.update({
          where: { id: existingItem.id },
          data: { quantity: { increment: 1 } },
        });
      } else {
        // Adicionar novo item
        await prismaClient.cartItems.create({
          data: {
            cartId: cart.id,
            productId,
            quantity: 1,
            price: product.price,
          },
        });
      }

      // Atualizar preço total
      cart = await updateCartTotal(cart.id);
    }

    res.status(201).json({
      message: "Product added to cart successfully",
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Error in AddToCart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Função auxiliar para calcular e atualizar o total do carrinho
async function updateCartTotal(cartId: string): Promise<CartWithItems> {
  const cartItems = await prismaClient.cartItems.findMany({
    where: { cartId },
    include: { product: true },
  });

  const total = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);

  const updatedCart = await prismaClient.cart.update({
    where: { id: cartId },
    data: {
      totalPrice: total.toFixed(2),
      updatedAt: new Date(),
    },
    include: {
      CartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return updatedCart as CartWithItems;
}
export const GetCart = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.body;
  try {
    const cart = await prismaClient.cart.findFirst({
      where: { userId: userId },
      include: {
        CartItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
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
