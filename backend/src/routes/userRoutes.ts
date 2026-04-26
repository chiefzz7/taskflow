import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const userController = new UserController();

router.post("/users", (req, res) => userController.create(req, res));

router.get("/me", authMiddleware, (req, res) =>
  userController.me(req, res)
);

export default router;
