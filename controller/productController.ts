import { Request, Response } from 'express';
import {db} from '../models/index.js';
// const { Product } = require('../models')

// import {Product} from '../models';
// import  {Product}  from '../models/product.js'; 
// const Product = require('../models/product.js');

const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { productName, productPrice, productRating, description } = req.body;    

    const newProduct = await db.Product.create({
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