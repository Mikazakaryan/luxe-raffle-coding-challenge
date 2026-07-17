'use client';

import { Button } from '@/components/ui/button';
import {
  removeFromCart,
  updateCartQuantity,
} from '@/server-functions/cart';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

function useCartAction() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const run = (action: () => Promise<void>) => {
    startTransition(async () => {
      await action();
      router.refresh();
    });
  };

  return { isPending, run };
}

type CartQuantityControlsProps = {
  raffleId: number;
  quantity: number;
};

export function CartQuantityControls({
  raffleId,
  quantity,
}: CartQuantityControlsProps) {
  const { isPending, run } = useCartAction();

  return (
    <div className="flex items-center space-x-2 mt-2">
      <Button
        variant="outline"
        size="icon"
        type="button"
        disabled={isPending}
        onClick={() => run(() => updateCartQuantity(raffleId, quantity - 1))}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        type="button"
        disabled={isPending}
        onClick={() => run(() => updateCartQuantity(raffleId, quantity + 1))}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

type RemoveFromCartButtonProps = {
  raffleId: number;
};

export function RemoveFromCartButton({ raffleId }: RemoveFromCartButtonProps) {
  const { isPending, run } = useCartAction();

  return (
    <Button
      variant="destructive"
      size="icon"
      type="button"
      disabled={isPending}
      onClick={() => run(() => removeFromCart(raffleId))}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
