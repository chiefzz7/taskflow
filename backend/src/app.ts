import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import taskRouter from "./routes/taskRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(authRouter);
app.use(taskRouter);

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

export default app;

