import express from "express";
import {
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  searchProducts,
} from "../controller/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);

router.post("/products", createProduct);

router.patch("/product/:id", editProduct);

router.delete("/product/:id", deleteProduct);

router.get("/serach-product", searchProducts);

export default router;
