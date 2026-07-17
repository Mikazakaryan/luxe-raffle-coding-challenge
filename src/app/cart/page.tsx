import { Button } from '@/components/ui/button';
import { getCart } from '@/server-functions/cart';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default async function CartPage() {
  const items = await getCart();


  const handleRemove = () => {
    // TODO: Implement this
  };

  const handleCheckout = () => {
    // TODO: Implement this. Redirect to /account
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="mb-8">
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => {
              const name = `Raffle #${item.id}`;

              return (
                <li key={item.id} className="flex items-center space-x-4">
                  <div className="flex h-[60px] w-20 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
                    #{item.id}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{name}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button variant="outline" size="icon" type="button">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium">{item.quantity}</span>
                      <Button variant="outline" size="icon" type="button">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="destructive" size="icon" type="button">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex justify-end">
        <Button variant="default" type="button">
          Checkout
        </Button>
      </div>
    </div>
  );
}
