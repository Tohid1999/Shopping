import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types";
import { FaCheckCircle } from "react-icons/fa";
import StatusWrapper from "../components/StatusWrapper";

const CheckoutPage: React.FC = () => {
  const { state, clearCart } = useCart();
  const { data: products, isLoading, error, refetch } = useProducts();
  const navigate = useNavigate();

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

  const handleConfirmPurchase = () => {
    clearCart();
    alert("Thank you for your purchase!");
    navigate("/");
  };

  const renderOrderSummaryItems = () => {
    return state.items.map((item) => {
      const product = productMap.get(item.id);
      if (!product) return null;
      return (
        <div key={item.id} className="flex justify-between">
          <span>
            {product.name} (Qty:{" "}
            <span className="font-bold">{item.quantity}</span>)
          </span>
          <span>${(product.price * item.quantity).toFixed(2)}</span>
        </div>
      );
    });
  };

  return (
    <main className="container mx-auto mt-8 animate-fade-in-up">
      <StatusWrapper
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        loadingMessage="Loading checkout information..."
        errorMessage="Failed to load checkout information"
      >
        <div className="border p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
            {renderOrderSummaryItems()}
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleConfirmPurchase}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center"
          >
            <FaCheckCircle className="mr-2" /> Confirm Purchase
          </button>
        </div>
      </StatusWrapper>
    </main>
  );
};

export default CheckoutPage;
