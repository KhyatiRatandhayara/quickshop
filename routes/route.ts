import express from "express";
import {
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  searchProducts,
} from "../controller/productController.js";
import { productValidator } from '../helpers/validation.js'
import { ProductURL } from '../helpers/product-types.js'

const router = express.Router();

router.get(ProductURL.GET_ALL_PRODUCTS, getAllProducts);

router.post(ProductURL.CREATE_PRODUCT, productValidator, createProduct);

router.patch(ProductURL.EDIT_PRODUCT, editProduct);

router.delete(ProductURL.DELETE_PRODUCT, deleteProduct);

router.get(ProductURL.SEARCH_PRODUCT, searchProducts);

export default router;
