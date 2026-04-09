import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {
    async create(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const user = await userService.createUser(name, email, password);

            return res.status(201).json(user);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}