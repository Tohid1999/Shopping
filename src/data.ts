
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    image: 'https://placehold.co/600x400/EEE/31343C',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    image: 'https://placehold.co/600x400/EEE/31343C',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 300,
    image: 'https://placehold.co/600x400/EEE/31343C',
  },
];
