'use server';

import { cartSchema, type Cart, type OrderItem } from '@/types/OrderItem';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const CART_COOKIE = 'cart';

const readCartFromCookie = async (): Promise<Cart> => {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CART_COOKIE)?.value;

  if (!raw) {
    return [];
  }

  try {
    const parsed = cartSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : [];
  } catch {
    return [];
  }
};

const writeCartToCookie = async (cart: Cart) => {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, JSON.stringify(cart), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
};

export const getCart = async (): Promise<Cart> => {
  return readCartFromCookie();
};

export const getCartItemCount = async (): Promise<number> => {
  const cart = await readCartFromCookie();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const addToCart = async (raffleId: number) => {
  const cart = await readCartFromCookie();
  const existing = cart.find((item) => item.id === raffleId);

  const nextCart: OrderItem[] = existing
    ? cart.map((item) =>
        item.id === raffleId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    : [...cart, { id: raffleId, quantity: 1 }];

  await writeCartToCookie(nextCart);
  revalidatePath('/', 'layout');
};

export const updateCartQuantity = async (
  raffleId: number,
  quantity: number,
) => {
  if (quantity < 1) {
    return removeFromCart(raffleId);
  }

  const cart = await readCartFromCookie();
  const nextCart = cart.map((item) =>
    item.id === raffleId ? { ...item, quantity } : item,
  );

  await writeCartToCookie(nextCart);
  revalidatePath('/', 'layout');
};

export const removeFromCart = async (raffleId: number) => {
  const cart = await readCartFromCookie();
  const nextCart = cart.filter((item) => item.id !== raffleId);

  await writeCartToCookie(nextCart);
  revalidatePath('/', 'layout');
};

export const clearCart = async () => {
  await writeCartToCookie([]);
  revalidatePath('/', 'layout');
};
