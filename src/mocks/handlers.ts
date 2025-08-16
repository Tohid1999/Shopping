import { http, HttpResponse, delay } from 'msw';
import { Product } from '../types';

const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://placehold.co/600x400/007BFF/FFFFFF?text=Headphones',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://placehold.co/600x400/28A745/FFFFFF?text=Watch',
  },
  {
    id: 3,
    name: 'Coffee Maker',
    price: 49.99,
    image: 'https://placehold.co/600x400/DC3545/FFFFFF?text=Coffee+Maker',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://placehold.co/600x400/FFC107/000000?text=Speaker',
  },
  {
    id: 5,
    name: 'Ergonomic Keyboard',
    price: 129.99,
    image: 'https://placehold.co/600x400/17A2B8/FFFFFF?text=Keyboard',
  },
  {
    id: 6,
    name: 'USB-C Hub',
    price: 39.99,
    image: 'https://placehold.co/600x400/6F42C1/FFFFFF?text=Hub',
  },
];

export const handlers = [
  http.get('/api/products', async () => {
    await delay(2000);
    return HttpResponse.json(products);
  }),
];
