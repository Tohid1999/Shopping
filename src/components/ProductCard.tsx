
import React from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { getQuantity, addToCart, increment, decrement } = useCart();
  const quantity = getQuantity(product.id);

  return (
    <div className="border p-4 rounded-lg shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <div className="mt-2">
        {quantity === 0 ? (
          <button
            onClick={() => addToCart(product.id)}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-center">
            <button onClick={() => decrement(product.id)} className="px-3 py-1 border">-</button>
            <span className="px-4 py-1">{quantity}</span>
            <button onClick={() => increment(product.id)} className="px-3 py-1 border">+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
