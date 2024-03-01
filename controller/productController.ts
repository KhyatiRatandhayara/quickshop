import { Request, Response } from "express";
import Product from "../models/product.js";
import { Op } from "sequelize";
import { AuthenticatedRequest } from "../helpers/user-types.js";
import User from "../models/user.js";


const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { productName, productPrice, productRating, description, userId } = req.body;
    const newProduct = await Product.create({
      productName,
      productPrice,
      productRating,
      description,
      userId
    });
    if (newProduct) {
      return res
        .status(201)
        .send({ message: "Product Created Successfully", newProduct });
    }
  } catch (error) {
    return res.status(500).send({
      message: "error while inserting the product",
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
      .status(500)
      .send({ error: "Some error occurred while retrieving products", message: error.message });
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
      .status(500)
      .send({ error: "Some error occurred while updating products", message: error.message });
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
      .status(500)
      .send({ error: "Some error occurred while deleting products", message: error.message });
  }
};

/**
 * 
 * @param req 
 * @param res 
 * @returns number records for the product
 */

const searchProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const searchTerm = req.query.searchTerm;
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
    const limit = 10; //perPage

    const offset = (currentPage - 1) * limit; // number of records that should be skipped from the beginning of the result set before returning rows.

    const { rows, count } = await Product.findAndCountAll({
      where: {
        [Op.or]: [
          { productName: { [Op.like]: `%${searchTerm}%` } },
          { description: { [Op.like]: `%${searchTerm}%` } },
        ],
      },
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).send({
      rows, totalSearchCount: count, totalPages: totalPages,
      currentPage
    });
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Error searching products:", message: error.message });
  }
};

const userProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userProductData = await User.findAll({
      include: [{
        model: Product,
        attributes: {
          exclude: ['password']
        }
      }]
    })
    return res.status(200).send({ data: userProductData });
  } catch (error) {
    console.log("error", error)
    return res
      .status(500)
      .send({ error: "Some error occurred while retrieving user products", message: error.message });
  }
};

export {
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  searchProducts,
  userProducts
};                                                
