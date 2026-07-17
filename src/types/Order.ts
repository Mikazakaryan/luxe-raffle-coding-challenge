import { OrderItem } from './OrderItem';

export type Order = {
  id: string;
  items: OrderItem[];
};
