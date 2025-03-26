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

    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        mark,
        price,
        categoryId,
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
): Promise<any> => {
  try {
    const products = await prismaClient.product.findMany({
      include: {
        images: true,
      },
    });
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {}
};
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
      });
    }
    const product = await prismaClient.product.delete({
      where: {
        id,
      },
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {}
};

// CATEGORIES
export const addNewCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name } = req.body;

    const veryfyCategory = await prismaClient.category.findFirst({
      where: {
        name,
      },
    });

    if (veryfyCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const category = await prismaClient.category.create({
      data: {
        name,
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getAllCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = await prismaClient.category.findMany();
    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "Categories not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
