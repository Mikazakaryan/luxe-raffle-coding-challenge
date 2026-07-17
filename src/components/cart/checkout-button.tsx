'use client';

import { Button } from '@/components/ui/button';
import { checkout, type CheckoutState } from '@/server-functions/order';
import { useActionState } from 'react';

const initialState: CheckoutState = { error: null };

type CheckoutButtonProps = {
  disabled?: boolean;
};

export function CheckoutButton({ disabled = false }: CheckoutButtonProps) {
  const [state, formAction, isPending] = useActionState(checkout, initialState);

  return (
    <form action={formAction} className="flex flex-col items-end gap-2">
      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={disabled || isPending}>
        {isPending ? 'Checking out…' : 'Checkout'}
      </Button>
    </form>
  );
}
