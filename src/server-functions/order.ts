'use server';

import { API_BASE_URL } from '@/lib/constants';
import { OrderItem } from '@/types/OrderItem';

export const order = async (
  {
    // items
  }: { items: OrderItem[] },
) => {
  // TODO: Implement placing order for customer
  fetch(API_BASE_URL + '/api/orders', {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      // Authorization: `Bearer ${token}`
    },
  });
};
