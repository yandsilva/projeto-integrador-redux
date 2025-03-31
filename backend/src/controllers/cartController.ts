import prismaClient from "../prisma";

export const AddToCart = async (
  userId: string,
  productId: string
): Promise<any> => {
  try {
    const product = await prismaClient.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }

    const existingItem = await prismaClient.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existingItem) {
      return await prismaClient.cart.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + 1,
        },
      });
    }

    return await prismaClient.cart.create({
      data: {
        userId,
        productId,
        quantity: 1,
      },
    });
  } catch (error) {
    throw new Error(`Error adding to cart: ${error.message}`);
  }
};
export const RemoveFromCart = async () => {};
export const GetCart = async () => {};
