import { Request, Response } from "express";
import prismaClient from "../prisma";

export const addNewProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, price, mark, description } = req.body;

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Imagem obrigatória" });
    }

    const images = files.map((file) => ({
      path: file.filename,
    }));

    console.log(images);

    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        mark,
        price,
        images: {
          create: images,
        },
      },
    });
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      address: product,
    });
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getAllProduct = async (
  req: Request,
  res: Response
): Promise<any> => {};
export const getSingleProduct = async (
  req: Request,
  res: Response
): Promise<any> => {};
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<any> => {};
