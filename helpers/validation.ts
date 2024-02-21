import Joi from "joi";

// Define a validation schema for the request body
const productSchema = Joi.object({
    productName: Joi.string().alphanum().min(3).max(30).required(),
    productPrice: Joi.number().min(0).required(),
    productRating: Joi.number().min(0).required(),
    description: Joi.string().min(3).max(100).required(),
});


export const productValidator = (req, res, next) => {
    const { error, value } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    } else {
        next();
    }
}
