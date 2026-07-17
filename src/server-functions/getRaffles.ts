'use server';

import { API_BASE_URL } from '@/lib/constants';
import { rafflesSchema } from '@/types/Raffle';

export const getRaffles = async () => {
  const response = await fetch(`${API_BASE_URL}/api/raffles`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to load raffles. Please try again.');
  }

  const data: unknown = await response.json();
  const parsed = rafflesSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error('Received invalid raffle data from the server.');
  }

  console.log('aaa', parsed.data);
  

  return parsed.data;
};
