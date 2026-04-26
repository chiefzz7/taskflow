import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  description: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  status: z.enum(["PENDING", "DONE"]).optional(),
});
