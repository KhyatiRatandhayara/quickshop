import express from "express";
import {
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  searchProducts,
} from "../controller/productController.js";
import { signupUser, userLogin } from '../controller/userController.js'
import { productValidator } from '../helpers/validation.js'
import { ProductURL } from '../helpers/product-types.js'
import { UserURL } from '../helpers/user-types.js';
import { checkUsernameOrEmailExist } from '../middleware/verifySignup.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get(ProductURL.GET_ALL_PRODUCTS, verifyToken, getAllProducts);

router.post(ProductURL.CREATE_PRODUCT, productValidator, createProduct);

router.patch(ProductURL.EDIT_PRODUCT, editProduct);

router.delete(ProductURL.DELETE_PRODUCT, deleteProduct);

router.get(ProductURL.SEARCH_PRODUCT, searchProducts);

router.post(UserURL.CREATE_USER, checkUsernameOrEmailExist, signupUser);

router.post(UserURL.LOGIN, userLogin);

export default router;
