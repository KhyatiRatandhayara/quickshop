import Joi from "joi";

// Define a validation schema for the request body
const productSchema = Joi.object({
    productName: Joi.string().min(3).max(30).required(),
    productPrice: Joi.number().min(0).required(),
    productRating: Joi.number().min(0).required(),
    productImage: Joi.binary().max(30 * 1024 * 1024).required(),
    description: Joi.string().min(3).max(100).required(),
    userId: Joi.number().required()
});


export const productValidator = (req, res, next) => {
    const { error, value } = productSchema.validate({ ...req.body, productImage: req.files[0].buffer });
    if (error) {
        return res.status(400).json({ error: "validation failed!", message: error.details[0].message });
    } else {
            next();
    }
}
