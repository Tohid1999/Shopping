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

  const productMap = React.useMemo(() => {
    if (!products) return new Map<number, Product>();
    return new Map(products.map((p) => [p.id, p]));
  }, [products]);

  const totalCost = React.useMemo(() => {
    return state.items.reduce((acc, item) => {
      const product = productMap.get(item.id);
      return acc + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [state.items, productMap]);

  const renderCartItems = () => {
    return state.items.map((item) => {
      const product = productMap.get(item.id);
      if (!product) return null;
      return <CartItemRow key={item.id} item={item} product={product} />;
    });
  };

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
