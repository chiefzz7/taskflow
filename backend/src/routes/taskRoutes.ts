import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const taskController = new TaskController();

router.post("/tasks", authMiddleware, (req, res) => 
    taskController.create(req, res)
);

router.get("/tasks", authMiddleware, (req, res) => 
    taskController.list(req, res)
);

router.put("/tasks/:id", authMiddleware, (req, res) => 
    taskController.update(req, res)
);

router.delete("/tasks/:id", authMiddleware, (req, res) =>
    taskController.delete(req, res)
);

export default router;


