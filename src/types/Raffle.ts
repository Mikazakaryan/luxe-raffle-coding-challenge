import { z } from 'zod';

export const raffleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  longDescription: z.string(),
  carPrice: z.union([z.number(), z.string()]),
  ticketPrice: z.number(),
  totalTickets: z.number(),
  availableTickets: z.number(),
});

export const rafflesSchema = z.array(raffleSchema);

export type Raffle = z.infer<typeof raffleSchema>;
