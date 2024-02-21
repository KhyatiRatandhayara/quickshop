import User from "../models/user.js";

const checkUsernameOrEmailExist = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({
            where : {
                email: req.body.email
            }
        });
        if (existingUser) {
            return res.status(500).send({ message: 'Email Already Exist!.' });
        }
        next();
    } catch (error) {
        next(error);
    }

}

export { checkUsernameOrEmailExist };