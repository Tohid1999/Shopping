import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <h1 className="text-3xl font-bold text-center py-4">Shopping Cart</h1>
      </header>
      <main className="container mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProductList />
        </div>
        <div>
          <ShoppingCart />
        </div>
      </main>
    </div>
  );
}

export default App;
