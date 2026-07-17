'use server';

import { API_BASE_URL } from '@/lib/constants';

export const login = async () => {
  // TODO: Implement login and store token safely
  fetch(API_BASE_URL + '/api/auth/token', {
    method: 'POST',
    body: JSON.stringify({
      //   email,
      //   password,
    }),
  });
};
