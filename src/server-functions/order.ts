'use server';

import { API_BASE_URL } from '@/lib/constants';
import { clearCart, getCart } from '@/server-functions/cart';
import { getAuthToken } from '@/server-functions/login';
import { placeOrderResponseSchema } from '@/types/Order';
import { type OrderItem } from '@/types/OrderItem';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export type CheckoutState = {
  error: string | null;
};

export const order = async ({ items }: { items: OrderItem[] }) => {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('You must be logged in to place an order.');
  }

  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Failed to place order.');
  }

  const data: unknown = await response.json();
  const parsed = placeOrderResponseSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error('Received invalid order response from the server.');
  }

  return parsed.data;
};

export const checkout = async (
  _prevState: CheckoutState,
  _formData: FormData,
): Promise<CheckoutState> => {
  const token = await getAuthToken();

  if (!token) {
    redirect('/login');
  }

  const items = await getCart();

  if (items.length === 0) {
    return { error: 'Your cart is empty.' };
  }

  try {
    await order({ items });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Checkout failed. Please try again.',
    };
  }

  await clearCart();
  revalidatePath('/', 'layout');
  redirect('/account');
};
