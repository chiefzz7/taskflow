import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { AuthRequest } from "../middlewares/authMiddleware";

export class TaskController {
  private taskService = new TaskService();

  async create(req: AuthRequest, res: Response) {
    const { title, description } = req.body;

    const task = await this.taskService.create(
      req.userId!,
      title,
      description
    );

    return res.status(201).json(task);
  }

  async list(req: AuthRequest, res: Response) {
    const tasks = await this.taskService.list(req.userId!);
    return res.json(tasks);
  }

  async update(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const task = await this.taskService.update(
      req.userId!,
      id,
      req.body
    );

    if (!task) {
      return res.status(404).json({ error: "Task não encontrada" });
    }

    return res.json(task);
  }

  async delete(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const task = await this.taskService.delete(req.userId!, id);

    if (!task) {
      return res.status(404).json({ error: "Task não encontrada" });
    }

    return res.json({ message: "Task deletada com sucesso" });
  }
}