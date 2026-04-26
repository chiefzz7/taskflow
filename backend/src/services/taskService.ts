import { prisma } from "../config/prisma";

export class TaskService {
  async create(userId: string, title: string, description?: string) {
    return prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });
  }

  async list(userId: string) {
    return prisma.task.findMany({
      where: { userId },
    });
  }

  async update(userId: string, taskId: string, data: any) {
    const task = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) return null;

    return prisma.task.update({
      where: { id: taskId },
      data,
    });
  }

  async delete(userId: string, taskId: string) {
    const task = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) return null;

    return prisma.task.delete({
      where: { id: taskId },
    });
  }
}