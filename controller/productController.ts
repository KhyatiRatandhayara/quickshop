import { Request, Response } from "express";
import Product from "../models/product.js";
import { Op } from "sequelize";
import { AuthenticatedRequest } from "../helpers/user-types.js";


const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { productName, productPrice, productRating, description } = req.body;
    const newProduct = await Product.create({
      productName,
      productPrice,
      productRating,
      description,
    });
    if (newProduct) {
      return res
        .status(201)
        .send({ message: "Product Created Successfully", newProduct });
    }
  } catch (error) {
    return res.status(error.status).send({
      error: error.message,
    });
  }
};

const getAllProducts = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const allProducts = await Product.findAll();
    return res
      .status(200)
      .send({ allProducts, totalCount: allProducts.length });
  } catch (error) {
    return res
      .status(error.status)
      .send({ message: "Some error occurred while retrieving products" });
  }
};

const editProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.update(
      { ...req.body },
      { where: { id: productId } }
    );

    return res.send(200).json(updatedProduct);
  } catch (error) {
    return res
      .status(error.status)
      .send({ message: "Some error occurred while updating products" });
  }
};

const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const productId = req.params.id;
    await Product.destroy({ where: { id: productId } });

    return res.status(200).send({ message: "product deleted successfully." });
  } catch (error) {
    return res
      .status(error.status)
      .send({ message: "Some error occurred while deleting products" });
  }
};

const searchProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const searchTerm = req.query.searchTerm;
    const { rows, count } = await Product.findAndCountAll({
      where: {
        [Op.or]: [
          { productName: { [Op.like]: `%${searchTerm}%` } },
          { description: { [Op.like]: `%${searchTerm}%` } },
        ],
      },
    });
    return res.status(200).send({ rows, totalSearchCount: count });
  } catch (error) {
    return res
      .status(error.status)
      .send({ message: "Error searching products:" });
  }
};

export {
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  searchProducts,
};
