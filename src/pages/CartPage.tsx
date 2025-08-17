import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartItemRow from "../components/CartItemRow";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types";
import { FaCreditCard } from "react-icons/fa";
import StatusWrapper from "../components/StatusWrapper";

const CartPage: React.FC = () => {
  const { state } = useCart();
  const { data: products, isLoading, error, refetch } = useProducts();

  // Creates a memoized map of products for efficient lookup by ID.
  // This avoids repeatedly searching the products array when calculating total cost or rendering cart items.
  const productMap = React.useMemo(() => {
    if (!products) return new Map<number, Product>();
    return new Map(products.map((p) => [p.id, p]));
  }, [products]);

  // Calculates the total cost of items in the cart.
  // useMemo ensures this calculation only re-runs when cart items or product data changes.
  const totalCost = React.useMemo(() => {
    return state.items.reduce((acc, item) => {
      const product = productMap.get(item.id);
      return acc + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [state.items, productMap]);

  // Helper function to render individual cart item rows.
  const renderCartItems = () => {
    return state.items.map((item) => {
      const product = productMap.get(item.id);
      if (!product) return null; // Should not happen if product data is consistent
      return <CartItemRow key={item.id} item={item} product={product} />;
    });
  };

  // Determines the content to display in the cart based on whether it's empty or not.
  const cartContent = state.items.length === 0 ? (
    <>
      <p className="text-lg">Your cart is empty.</p>
      <Link
        to={"/"}
        className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center"
      >
        Add some Product
      </Link>
    </>
  ) : (
    <div>
      {renderCartItems()}
      <div className="text-right mt-4">
        <h3 className="text-xl font-bold">
          Total: ${totalCost.toFixed(2)}
        </h3>
        <Link
          to="/checkout"
          className="mt-4 inline-flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
        >
          <FaCreditCard className="mr-2" /> Proceed to Checkout
        </Link>
      </div>
    </div>
  );

  return (
    <main className="container mx-auto mt-8 animate-fade-in-up">
      {/* StatusWrapper handles loading, error, and refetching states for product data */}
      <StatusWrapper
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        loadingMessage="Loading cart items..."
        errorMessage="Failed to load cart items"
      >
        <div className="border p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          {cartContent}
        </div>
      </StatusWrapper>
    </main>
  );
};

export default CartPage;