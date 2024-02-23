import jwt, { Secret } from "jsonwebtoken";
import { verifyRefreshToken } from "../controller/userController.js";
import { Request, Response, NextFunction } from 'express';
const { TokenExpiredError } = jwt;

interface CustomRequest extends Request {
    userId?: number;
}

const getCurrentToken = (req: Request): string => {
    let token = req.headers["x-access-token"] || req.headers.authorization || req.body.token || req.query.token;

    console.log('x-access-token',req.headers["x-access-token"]);
    console.log('req.headers.authorization',req.headers.authorization);
    console.log('req.body.token',req.body.token);
    console.log('req.query.token',req.query.token);
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }
    return token;
}

const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {

        const token = getCurrentToken(req);
        if (!token) {
            return res.status(401).send({ message: "User token is not provided!." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret) as CustomRequest;
        console.log("decoded", decoded);
        /***
         * further method can directly get this userId in req object. 
         */
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            if (req.headers?.cookie) {
                const cookieHeader = req.headers?.cookie;
                const result = await verifyRefreshToken(cookieHeader);
                if (result.status === 200) {
                    // Set the new access token in Authorization header
                    req.headers.authorization = `Bearer ${result.accessToken}`;
                    // req.userId = result.userId;
                    return verifyToken(req, res,next);
                } else {
                    // Refresh token failed, return an error response
                    return res.status(result.status).send({ message: result.message });
                }
            }
            return res.status(401).send({ message: "Your Token is expired Please Signin yourself!." });
        } else {
            return res.status(401).send({ message: "Authorization has been denied for the request." });
        }

    }
}

export { verifyToken }