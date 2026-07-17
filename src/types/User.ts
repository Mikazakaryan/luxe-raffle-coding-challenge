import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
});

export const tokenResponseSchema = z.object({
  token: z.string().min(1),
});

export const authErrorSchema = z.object({
  error: z.string(),
});

export type User = z.infer<typeof userSchema>;
