import { z } from 'zod';
import { orderItemSchema } from './OrderItem';

export const orderSchema = z.object({
  id: z.string(),
  items: z.array(orderItemSchema),
});

export const ordersSchema = z.array(orderSchema);

export const placeOrderResponseSchema = z.object({
  orderId: z.string(),
});

export type Order = z.infer<typeof orderSchema>;
