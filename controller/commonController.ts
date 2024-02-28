import { Request, Response } from "express";

const invalidUrl = (req: Request, res: Response) => {
    return res.status(404).send({message : "Invalid URL"});
}
export default invalidUrl;