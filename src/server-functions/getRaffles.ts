'use server';

import { API_BASE_URL } from '@/lib/constants';

export const getRaffles = async () => {
  // TODO: Make this somehow type-safe, possibly with zod
  return await fetch(API_BASE_URL + '/api/raffles').then((res) => res.json());
};
