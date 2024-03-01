import { Request, Response, NextFunction } from "express";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import authToken from "../models/authtoken.js";

interface CustomRequest extends Request {
    newAccessToken?: string;
}

const signupUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const newUser = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password
        });
        if (newUser) {
            return res
                .status(201)
                .send({ message: "User registered successfully", newUser });
        }
    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

const userLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed, User Not Found! Please Sign Up in the System!.' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed, password doesnt match.' });
        }
        // Generate JWT with short expiration time
        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRATION,
        });
        // Creating refresh token not that expiry of refresh token is greater than the access token 
        let refreshToken = await authToken.prototype.createToken(user);
        // Assigning refresh token in http-only cookie 
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // An http-only cookie cannot be accessed by client-side APIs 
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        const { password: userPassword, ...userData } = user.dataValues;

        res.status(200).json({ message: 'User Logged In!', user: { ...userData, accessToken, refreshToken } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed', message: error.message });
    }
}

const verifyRefreshToken = async (cookieHeader: string) => {
    try {
        let requestToken = cookieHeader;
        if (requestToken.startsWith('refreshToken=')) {
            requestToken = requestToken.split('=')[1];
        }
        if (requestToken == null) {
            return { status: 403, message: "Refresh Token is required!" };
        }
        let refreshToken = await authToken.findOne({ where: { token: requestToken } });
        if (!refreshToken) {
            return { status: 403, message: "Invalid refresh token" };
        }
        if (authToken.prototype.verifyExpiration(refreshToken)) {
            authToken.destroy({ where: { id: refreshToken.id } });
            return { status: 403, message: "Refresh token was expired. Please make a new sign in request" };
        }

        const user = await User.findOne({
            where: { id: refreshToken.userId },
            attributes: {
                exclude: ['password']
            }
        });
        let newAccessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        return { status: 200, userId: user.id, accessToken: newAccessToken, refreshToken: refreshToken.token };

    } catch (err) {
        console.log('err', err);
        return { status: 500, error: 'Internal server error', message: err.message };
    }
}


const userLogout = async (req: Request, res: Response): Promise<Response> => {

    try {
        const cookies = req.headers.cookie ? Object.fromEntries(req.headers.cookie.split(';').map(cookie => cookie.trim().split('='))) : {};

        if (!cookies['refreshToken']) {
            return res.status(500).send({ message: "No Refresh Token in Cookies" });
        }
        const refreshToken = cookies['refreshToken'];
        const user = await authToken.findOne({ where: { token: refreshToken } });
        if (!user) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            });
            return res.sendStatus(204); // no_content, server successfully processes the request, but there is no content to return to the client
        }
        await authToken.update(
            { token: '' },
            { where: { userId: user.userId } }
        )
        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        res.sendStatus(204); // no_content

    } catch (error) {
        console.log('err', error);
        res.status(500).json({ error: 'logout failed', message: error.message });
    }


}

export { signupUser, userLogin, verifyRefreshToken, userLogout }