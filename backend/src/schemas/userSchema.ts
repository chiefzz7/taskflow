import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha mínima de 6 caracteres"),
})
