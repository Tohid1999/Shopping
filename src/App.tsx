import { Link, Outlet, useLocation } from "react-router-dom";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import { useCart } from "./hooks/useCart";

function App() {
  const { cartCount } = useCart();

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-2xl font-bold">
            <FaShoppingBag className="mr-2" />
            <span>My Shop</span>
          </Link>
          <Link to="/cart" className="flex items-center">
            <FaShoppingCart className="text-2xl" />
            <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
              {cartCount}
            </span>
          </Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
