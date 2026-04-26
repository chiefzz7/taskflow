import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { AuthRequest } from "../middlewares/authMiddleware";
import { createUserSchema } from "../schemas/userSchema";

export class UserController {
  private userService = new UserService();

  async create(req: Request, res: Response) {
    try {
      const result = createUserSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json(result.error.format());
      }
      
      const { name, email, password } = result.data;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Campos obrigatórios" });
      }

      const user = await this.userService.createUser(
        name,
        email,
        password
      );

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async me(req: AuthRequest, res: Response) {
    const user = await this.userService.getMe(req.userId!);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.json(user);
  }
}
