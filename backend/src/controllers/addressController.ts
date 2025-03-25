import prismaClient from "../prisma";
import { Request, Response } from "express";

export const createAddress = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { zip, street, number, city, state, neighborhood } = req.body;
    const userId = req.user.id;

    if (!zip || !street || !number || !city || !state || !neighborhood) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingAddress = await prismaClient.address.findFirst({
      where: {
        zip,
        userId,
      },
    });

    if (existingAddress) {
      return res.status(400).json({
        success: false,
        message: "Address already exists",
      });
    }

    const newAddress = await prismaClient.address.create({
      data: {
        zip,
        street,
        number,
        city,
        state,
        neighborhood,
        user: { connect: { id: userId } },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Address created successfully",
      address: newAddress,
    });
  } catch (error) {
    console.log("Error in createAddress controller", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const searchAddress = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Usuário não autenticado.",
      });
    }

    const address = await prismaClient.address.findMany({
      where: {
        userId,
      },
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Endereço não encontrado.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Endereço encontrado.",
      address,
    });
  } catch (error: any) {
    console.error("Erro no controlador searchAddress:", error.message);
    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor.",
    });
  }
};
export const updateAddress = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { zip, street, number, city, state, neighborhood } = req.body;
    const userId = req.user.id;
    const addressId = req.params.id;
    const address = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        userId,
      },
    });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Endereço não encontrado.",
      });
    }
    const updatedAddress = await prismaClient.address.update({
      where: {
        id: addressId,
      },
      data: {
        zip,
        street,
        number,
        city,
        state,
        neighborhood,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Endereço atualizado com sucesso.",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Erro no controlador updateAddress:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor.",
    });
  }
};
export const deleteAddress = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const address = await prismaClient.address.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Endereço não encontrado.",
      });
    }
    await prismaClient.address.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Endereço deletado com sucesso.",
    });
  } catch (error) {
    console.error("Erro no controlador deleteAddress:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor.",
    });
  }
};
