import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getOrders } from '@/server-functions/getOrders';
import { getRaffles } from '@/server-functions/getRaffles';
import { getCurrentUser, logout } from '@/server-functions/login';
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const [orders, raffles] = await Promise.all([getOrders(), getRaffles()]);

  const ticketHistory = orders.flatMap((order) =>
    order.items.flatMap((item) => {
      const raffle = raffles.find((entry) => entry.id === item.id);

      return [
        {
          orderId: order.id,
          raffleId: item.id,
          quantity: item.quantity,
          name: raffle?.name ?? `Raffle #${item.id}`,
          ticketPrice: raffle?.ticketPrice,
        },
      ];
    }),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Account Information</CardTitle>
          <CardDescription>Welcome, {user.firstName}!</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-4">Your Raffle Tickets</h3>
          {ticketHistory.length === 0 ? (
            <p>You haven&apos;t purchased any tickets yet.</p>
          ) : (
            <ul className="space-y-4">
              {ticketHistory.map((ticket) => (
                <li
                  key={`${ticket.orderId}-${ticket.raffleId}`}
                  className="border-b pb-4 last:border-b-0"
                >
                  <p className="font-semibold">{ticket.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {ticket.quantity} ticket{ticket.quantity === 1 ? '' : 's'}
                    {ticket.ticketPrice != null
                      ? ` · ${ticket.ticketPrice * ticket.quantity} €`
                      : ''}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Order {ticket.orderId.slice(0, 8)}…
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter>
          <form action={logout} className="w-full">
            <Button variant="destructive" className="w-full" type="submit">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
