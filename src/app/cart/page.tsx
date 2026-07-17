import {
  CartQuantityControls,
  RemoveFromCartButton,
} from '@/components/cart/cart-item-actions';
import { Button } from '@/components/ui/button';
import { getCart } from '@/server-functions/cart';
import { getRaffles } from '@/server-functions/getRaffles';
import Image from 'next/image';

export default async function CartPage() {
  const [items, raffles] = await Promise.all([getCart(), getRaffles()]);

  const cartItems = items.flatMap((item) => {
    const raffle = raffles.find((entry) => entry.id === item.id);
    if (!raffle) {
      return [];
    }

    return [
      {
        id: item.id,
        quantity: item.quantity,
        name: raffle.name,
        image: raffle.image,
        description: raffle.description,
        ticketPrice: raffle.ticketPrice,
      },
    ];
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.ticketPrice * item.quantity,
    0,
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="mb-8">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center space-x-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={60}
                  className="h-[60px] w-20 rounded-md object-cover"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="text-sm mt-1">{item.ticketPrice} € / ticket</p>
                  <CartQuantityControls
                    raffleId={item.id}
                    quantity={item.quantity}
                  />
                </div>
                <p className="font-semibold whitespace-nowrap">
                  {item.ticketPrice * item.quantity} €
                </p>
                <RemoveFromCartButton raffleId={item.id} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-lg font-semibold">Total: {total} €</p>
        <Button variant="default" type="button">
          Checkout
        </Button>
      </div>
    </div>
  );
}
