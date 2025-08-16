import React, { createContext, useReducer, ReactNode, useMemo } from "react";
import { CartItem } from "../types";

export interface CartState {
  items: CartItem[];
}

export enum CartActionType {
  AddItem = "ADD_ITEM",
  RemoveItem = "REMOVE_ITEM",
  IncrementQuantity = "INCREMENT_QUANTITY",
  DecrementQuantity = "DECREMENT_QUANTITY",
  ClearCart = "CLEAR_CART",
}

type CartAction =
  | { type: CartActionType.AddItem; payload: { id: number } }
  | { type: CartActionType.RemoveItem; payload: { id: number } }
  | { type: CartActionType.IncrementQuantity; payload: { id: number } }
  | { type: CartActionType.DecrementQuantity; payload: { id: number } }
  | { type: CartActionType.ClearCart };

interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  cartCount: number;
}

const initialState: CartState = {
  items: [],
};

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionType.AddItem: {
      const { id } = action.payload;
      const existItem = state.items.find((x) => x.id === id);

      if (existItem) {
        return {
          ...state,
          items: state.items.map((x) =>
            x.id === id ? { ...x, quantity: x.quantity + 1 } : x
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { id, quantity: 1 }],
        };
      }
    }
    case CartActionType.RemoveItem: {
      return {
        ...state,
        items: state.items.filter((x) => x.id !== action.payload.id),
      };
    }
    case CartActionType.IncrementQuantity: {
      return {
        ...state,
        items: state.items.map((x) =>
          x.id === action.payload.id ? { ...x, quantity: x.quantity + 1 } : x
        ),
      };
    }
    case CartActionType.DecrementQuantity: {
      return {
        ...state,
        items: state.items
          .map((x) =>
            x.id === action.payload.id ? { ...x, quantity: x.quantity - 1 } : x
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case CartActionType.ClearCart: {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const cartCount = useMemo(() => {
    return state.items.reduce((acc, item) => acc + item.quantity, 0);
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
