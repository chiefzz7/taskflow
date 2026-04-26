import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { loginSchema } from "../schemas/authSchema";

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response) {
    try {
      const resultZod = loginSchema.safeParse(req.body);

      if (!resultZod.success) {
        return res.status(400).json(resultZod.error.format());
      }
      
      const { email, password } = resultZod.data;

      if (!email || !password) {
        return res.status(400).json({ error: "Campos obrigatórios" });
      }

      const result = await this.authService.login(email, password);

      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}