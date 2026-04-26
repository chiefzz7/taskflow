import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const taskController = new TaskController();

router.use(authMiddleware);

router.post("/tasks", (req, res) => taskController.create(req, res));
router.get("/tasks", (req, res) => taskController.list(req, res));
router.put("/tasks/:id", (req, res) => taskController.update(req, res));
router.delete("/tasks/:id", (req, res) => taskController.delete(req, res));

export default router;
