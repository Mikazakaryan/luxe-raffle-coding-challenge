'use server';

import { API_BASE_URL } from '@/lib/constants';
import { decryptToken } from '@/lib/token';
import { authErrorSchema, tokenResponseSchema, type User } from '@/types/User';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const TOKEN_COOKIE = 'token';

export type LoginState = {
  error: string | null;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return decryptToken(token);
};

export const login = async (
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> => {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data: unknown = await response.json();

  if (!response.ok) {
    const error = authErrorSchema.safeParse(data);
    return {
      error: error.success ? error.data.error : 'Login failed. Please try again.',
    };
  }

  const parsed = tokenResponseSchema.safeParse(data);

  if (!parsed.success) {
    return { error: 'Received invalid login response from the server.' };
  }

  const user = decryptToken(parsed.data.token);

  if (!user) {
    return { error: 'Unable to read authentication token.' };
  }

  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE, parsed.data.token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  revalidatePath('/', 'layout');
  redirect('/');
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  revalidatePath('/', 'layout');
  redirect('/login');
};
