
import React from 'react';
import { products, Product } from '../data';

const ProductList: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product: Product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
