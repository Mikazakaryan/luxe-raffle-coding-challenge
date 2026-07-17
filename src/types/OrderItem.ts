import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.number(),
  quantity: z.number().int().positive(),
});

export const cartSchema = z.array(orderItemSchema);

export type OrderItem = z.infer<typeof orderItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
