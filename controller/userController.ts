import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";

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
        return res.status(error.status).send({
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
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });
        res.status(200).json({ message: 'User Logged In!', token });
    } catch (error) {
        res.status(error.status).json({ error: 'Login failed', message: error.message });
    }
}

export { signupUser, userLogin }