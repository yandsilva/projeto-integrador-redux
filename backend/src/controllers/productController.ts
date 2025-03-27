import { Request, Response } from "express";
import prismaClient from "../prisma";
import { ICategoryCreate, IProductCreate } from "../types/product.interface";

export const addNewProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, price, mark, description, categoryId } =
      req.body as IProductCreate;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Imagem obrigatória" });
    }

    if (!categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Categoria é obrigatória" });
    }

    const categoryExists = await prismaClient.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      return res
        .status(404)
        .json({ success: false, message: "Categoria não encontrada" });
    }

    // Cria o produto com a categoria
    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        mark,
        price,
        categoryId,
        images: {
          create: files.map((file) => ({ path: file.filename })),
        },
      },
      include: {
        images: true,
        category: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Produto criado com sucesso",
      product,
    });
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
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
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
};

// CATEGORIES
export const addNewCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name } = req.body as ICategoryCreate;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Nome é obrigatório",
      });
    }

    const existingCategory = await prismaClient.category.findFirst({
      where: { name },
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Categoria já existe",
      });
    }

    const category = await prismaClient.category.create({
      data: { name },
    });

    return res.status(201).json({
      success: true,
      message: "Categoria criada com sucesso",
      category,
    });
  } catch (error) {
    console.error("Error in addNewCategory:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
};
export const getAllCategories = async (
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
