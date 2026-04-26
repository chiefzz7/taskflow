import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";

export class UserService {
  async createUser(name: string, email: string, password: string) {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error("Usuário já existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
