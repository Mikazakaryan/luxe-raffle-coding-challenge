'use server';

import { API_BASE_URL } from '@/lib/constants';
import { getAuthToken } from '@/server-functions/login';
import { ordersSchema, type Order } from '@/types/Order';

export const getOrders = async (): Promise<Order[]> => {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('You must be logged in to view orders.');
  }

  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to load orders. Please try again.');
  }

  const data: unknown = await response.json();
  const parsed = ordersSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error('Received invalid orders data from the server.');
  }

  return parsed.data;
};
