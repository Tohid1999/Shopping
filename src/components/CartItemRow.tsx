
import React from 'react';
import { CartItem, Product } from '../types';
import { useCart } from '../hooks/useCart';

interface CartItemRowProps {
  item: CartItem;
  product: Product;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item, product }) => {
  const { increment, decrement, remove } = useCart();

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="flex items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover mr-4"
        />
        <div>
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button onClick={() => decrement(item.id)} className="px-2 border">-</button>
        <span className="px-4">{item.quantity}</span>
        <button onClick={() => increment(item.id)} className="px-2 border">+</button>
        <button onClick={() => remove(item.id)} className="ml-4 text-red-500">Remove</button>
      </div>
    </div>
  );
};

export default CartItemRow;
