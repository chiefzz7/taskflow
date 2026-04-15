import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

const taskService = new TaskService();

interface AuthRequest extends Request {
    userId?: string;
}

export class TaskController {
    async create(req: AuthRequest, res: Response) {
        try {
            const { title, description } = req.body;

            const task = await taskService.create(
                req.userId!, 
                title, 
                description
            );

            return res.status(201).json(task);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async list(req: AuthRequest, res: Response) {
        try {
            const task = await taskService.list(req.userId!);

            return res.json(task);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async update(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;

            const task = await taskService.update(
                req.userId!,
                id,
                req.body
            );

            return res.json(task);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            await taskService.delete(req.userId!, id);

            return res.json({ message: "Task deletada" });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
