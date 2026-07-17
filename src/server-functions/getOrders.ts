'use server';

import { API_BASE_URL } from '@/lib/constants';

export const order = async () => {
  // TODO: Implement getting orders to display on the account page
  // TODO: Make this type-safe, possibly with zod
  fetch(API_BASE_URL + '/api/orders', {
    headers: {
      // Authorization: `Bearer ${token}`
    },
  });
};
