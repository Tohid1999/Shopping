import React from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import StatusWrapper from "./StatusWrapper";

const ProductList: React.FC = () => {
  const { data: products, isLoading, error, refetch } = useProducts();

  const renderProductCards = () => {
    return products?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <StatusWrapper
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      loadingMessage="Loading products..."
      errorMessage="Failed to load products"
      loadingContent={
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      }
    >
      {/* Content to display when not loading and no error */}
      <div className="px-4">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {renderProductCards()}
        </div>
      </div>
    </StatusWrapper>
  );
};

export default ProductList;
