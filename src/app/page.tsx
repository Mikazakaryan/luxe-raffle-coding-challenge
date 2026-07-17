import RafflesGrid from '@/components/raffles-grid/raffles-grid';
import { getRaffles } from '@/server-functions/getRaffles';

export default async function Home() {
  const raffles = await getRaffles();

  return <RafflesGrid raffles={raffles} />;
}
