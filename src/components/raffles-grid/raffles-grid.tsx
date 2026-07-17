import { Raffle } from '@/types/Raffle';
import RaffleTile from '../raffle-tile/raffle-tile';

export default function RafflesGrid({ raffles }: { raffles: Raffle[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">LuxeRaffle</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {raffles.map((raffle) => (
          <RaffleTile key={raffle.id} raffle={raffle} />
        ))}
      </div>
    </div>
  );
}
