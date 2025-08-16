
import React from 'react';

const ShoppingCart: React.FC = () => {
  return (
    <div className="border p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div>
        <p>Your cart is empty.</p>
      </div>
    </div>
  );
};

export default ShoppingCart;
