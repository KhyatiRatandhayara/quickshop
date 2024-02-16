import express from "express";
import {createProduct} from '../controller/productController.js'

const router = express.Router();

router.get('/products', (req, res) => res.send({"message": "products"}));

router.post('/products', createProduct)


export default router;