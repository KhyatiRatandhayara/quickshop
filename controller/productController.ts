import { Request, Response } from "express";
import Product from "../models/product.js";
import { Op } from "sequelize";
import { AuthenticatedRequest } from "../helpers/user-types.js";
import User from "../models/user.js";
import multer from "multer";
// import path from "path";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("req destination", req)
      // const destinationPath = path.resolve(__dirname, '..', 'public'); // Resolve destination path
      // cb(null, destinationPath);
      cb(null, "public");
  },
  filename: (req, file, cb) => {
    console.log("req filename", req)
      const ext = file.mimetype.split("/")[1];
      console.log("ext", ext);
      cb(null, `/${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  console.log("req multerFilter", req)
  if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb( new Error('Please upload a valid image file'), false)
      } else {
        cb(null, true);
      }
};

export const uploadFile =   multer({
  storage: multerStorage,
  limits: {
      fileSize: 3 * 1024 * 1024, //max 3MB file upload
  },
  fileFilter: multerFilter,
});


const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { productName, productPrice, productRating, description, userId } = req.body;
    console.log(req.file)
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
