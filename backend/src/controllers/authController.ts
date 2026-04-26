import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

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