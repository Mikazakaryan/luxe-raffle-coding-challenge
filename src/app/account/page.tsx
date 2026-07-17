'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LogOut } from 'lucide-react';

export default function AccountPage() {
  const handleLogout = () => {
    // TODO: Implement logout
  };

  const firstName = ''; // TODO: This should be the user's first name

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Account Information</CardTitle>
          <CardDescription>Welcome, {firstName}!</CardDescription>
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
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
