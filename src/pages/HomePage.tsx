
import React from 'react';
import ProductList from '../components/ProductList';

const HomePage: React.FC = () => {
  return (
    <main className="container mx-auto mt-8 animate-fade-in-up">
      <ProductList />
    </main>
  );
};

export default HomePage;
