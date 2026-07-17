'use client';

import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface CartItem {
  id: number;
  quantity: number;
}

export default function CartPage() {
  // TODO: This must come from the cart
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      quantity: 1,
    },
    {
      id: 6,
      quantity: 1,
    },
  ]);

  const handleQuantityUpdate = (id: number, newQuantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

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
              // TODO: We need to load data from the server somehow
              const name = '';
              const imageSrc = '';

              return (
                <li key={item.id} className="flex items-center space-x-4">
                  <Image
                    src={imageSrc}
                    alt={name}
                    width={80}
                    height={60}
                    className="rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{name}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityUpdate(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityUpdate(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemove()}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex justify-end">
        <Button variant="default" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
