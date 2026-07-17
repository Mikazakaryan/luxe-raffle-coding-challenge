'use client';

import { Button } from '@/components/ui/button';
import { addToCart } from '@/server-functions/cart';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

type AddToCartButtonProps = {
  raffleId: number;
};

export function AddToCartButton({ raffleId }: AddToCartButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await addToCart(raffleId);
      router.refresh();
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? 'Adding…' : 'Add to Cart'}
    </Button>
  );
}
