
import React from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { FaPlus } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { getQuantity, addToCart, increment, decrement } = useCart();
  const quantity = getQuantity(product.id);

  return (
    <div className="border p-5 rounded-lg shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <div className="mt-2">
        {quantity === 0 ? (
          <button
            onClick={() => addToCart(product.id)}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center"
          >
            <FaPlus className="mr-2" /> Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-center">
            <button onClick={() => decrement(product.id)} className="px-3 py-1 border rounded-md">-</button>
            <span className="px-4 py-1">{quantity}</span>
            <button onClick={() => increment(product.id)} className="px-3 py-1 border rounded-md">+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
