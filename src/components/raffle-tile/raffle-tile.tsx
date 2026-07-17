import { Raffle } from '@/types/Raffle';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export default function RaffleTile({ raffle }: { raffle: Raffle }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={raffle.image || '/placeholder.svg'}
        alt={raffle.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between mb-2 gap-2">
          <h2 className="text-xl font-semibold">{raffle.name}</h2>
          <p className="text-lg font-semibold whitespace-nowrap">
            {raffle.ticketPrice} €
          </p>
        </div>

        <Badge variant="outline" className="mb-2">
          {raffle.availableTickets} / {raffle.totalTickets} tickets left
        </Badge>

        <p className="text-gray-600 mb-4">{raffle.description}</p>

        <div className="flex justify-between">
          <Button variant="outline">Add to Cart</Button>
          <Button>View Details</Button>
        </div>
      </div>
    </div>
  );
}
