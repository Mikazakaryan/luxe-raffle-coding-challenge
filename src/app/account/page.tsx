import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getCurrentUser, logout } from '@/server-functions/login';
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Account Information</CardTitle>
          <CardDescription>Welcome, {user.firstName}!</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-4">Your Raffle Tickets</h3>
          {/* {tickets.length === 0 ? (
            <p>You haven't purchased any tickets yet.</p>
          ) : (
            <ul className="space-y-4">
              {tickets.map((ticket) => (
                <li key={ticket.id} className="border-b pb-4 last:border-b-0">
                  <p>...</p>
                </li>
              ))}
            </ul>
          )} */}
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
