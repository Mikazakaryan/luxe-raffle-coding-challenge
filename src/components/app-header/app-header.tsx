import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { UserIcon } from '../user-icon/user-icon';

const CartCounter = ({ items }: { items: number }) => (
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
    {items}
  </span>
);

export const AppHeader = async () => {
  const firstName = ''; // TODO: Somehow get this from the token
  const amountOfCartItems = 0; // TODO: Somehow get this from the cart

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            LuxeRaffle
          </Link>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/winners"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Winners
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-800"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {firstName ? (
            <Link href="/account">
              <UserIcon firstName={firstName} />
            </Link>
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-gray-800">
              <User size={24} />
            </Link>
          )}
          <Link
            href="/cart"
            className="text-gray-600 hover:text-gray-800 relative"
          >
            <ShoppingCart size={24} />
            {!!amountOfCartItems && <CartCounter items={amountOfCartItems} />}
          </Link>
        </div>
      </div>
    </header>
  );
};
