import express from "express";
import {
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  searchProducts,
  userProducts
} from "../controller/productController.js";
import { verifyRefreshToken, signupUser, userLogin } from '../controller/userController.js'
import { productValidator } from '../helpers/validation.js'
import { ProductURL } from '../helpers/product-types.js'
import { UserURL } from '../helpers/user-types.js';
import { checkUsernameOrEmailExist } from '../middleware/verifySignup.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get(ProductURL.GET_ALL_PRODUCTS, verifyToken, getAllProducts);

router.post(ProductURL.CREATE_PRODUCT, verifyToken, productValidator, createProduct);

router.patch(ProductURL.EDIT_PRODUCT, verifyToken, editProduct);

router.delete(ProductURL.DELETE_PRODUCT, verifyToken, deleteProduct);

router.get(ProductURL.SEARCH_PRODUCT, verifyToken, searchProducts);

router.get(ProductURL.USER_PRODUCTS, verifyToken, userProducts);

router.post(UserURL.CREATE_USER, checkUsernameOrEmailExist, signupUser);

router.post(UserURL.LOGIN, userLogin);

router.post(UserURL.CREATE_REFRESH_TOKEN, verifyRefreshToken);

export default router;
