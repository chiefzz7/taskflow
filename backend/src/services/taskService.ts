import { prisma } from "../config/prisma";

export class TaskService {
    async create(userId: string, title: string, description?: string ) {
        return prisma.task.create({
            data: {
                title,
                description,
                userId
            }
        });
    }

    async list(userId: string) {
        return prisma.task.findMany({
            where: { userId }
        });
    }

    async update(userId: string, taskId: string, data: any) {
        return prisma.task.updateMany({
            where: {
                id: taskId,
                userId
            },
            data
        });
    }

    async delete(userId: string, taskId: string) {
        return prisma.task.deleteMany({
            where: {
                id: taskId,
                userId
            }
        });
    }
} 

