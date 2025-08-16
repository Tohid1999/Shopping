
import { useContext } from 'react';
import { CartContext, CartActionType } from '../context/CartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { state, dispatch, cartCount } = context;

  const getQuantity = (id: number) => {
    const item = state.items.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const addToCart = (id: number) => {
    dispatch({ type: CartActionType.AddItem, payload: { id } });
  };

  const increment = (id: number) => {
    dispatch({ type: CartActionType.IncrementQuantity, payload: { id } });
  };

  const decrement = (id: number) => {
    dispatch({ type: CartActionType.DecrementQuantity, payload: { id } });
  };

  const remove = (id: number) => {
    dispatch({ type: CartActionType.RemoveItem, payload: { id } });
  };

  return { state, cartCount, getQuantity, addToCart, increment, decrement, remove };
};
