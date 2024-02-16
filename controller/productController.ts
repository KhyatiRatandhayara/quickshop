import { Request, Response } from 'express';
import { Sequelize, sequelize } from '../models/index.js';
import { Product } from "../models/product.js";

const product = new Product(sequelize, Sequelize);


const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { productName, productPrice, productRating, description } = req.body;   
    console.log("req.body", req.body);
     

    const newProduct = await product.create({
      productName,
      productPrice,
      productRating,
      description,
    });
    if (newProduct) {
      return res
        .status(200)
        .send({ message: "Product Created Successfully", newProduct });
    }
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};


export { createProduct }