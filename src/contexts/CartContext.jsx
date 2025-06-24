
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.product.id);
      if (existingItemIndex > -1) {
        // Item already exists, update quantity or show error based on allowDuplicates
        if (action.payload.allowDuplicates) {
          const updatedItems = state.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );
          return { ...state, items: updatedItems };
        } else {
          // If duplicates not allowed, you might want to inform the user
          // This part is tricky without a backend to properly merge.
          // For now, let's just update quantity if it exists, effectively not allowing 'duplicate entries' but summing quantities
          const updatedItems = state.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );
          return { ...state, items: updatedItems };
        }
      }
      // Item does not exist, add new
      return {
        ...state,
        items: [...state.items, { ...action.payload.product, quantity: action.payload.quantity }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) } // Prevent negative quantity
            : item
        ).filter(item => item.quantity > 0) // Remove if quantity becomes 0
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || [] // Ensure payload is not null/undefined
      };
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const savedCart = localStorage.getItem('meenora_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: Array.isArray(parsedCart) ? parsedCart : [] });
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        dispatch({ type: 'LOAD_CART', payload: [] });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('meenora_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product, quantity = 1, allowDuplicates = false) => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem && !allowDuplicates) {
        toast({
            title: "Item Already in Cart",
            description: `${product.name} is already in your cart. You can adjust the quantity there.`,
            variant: "destructive",
        });
        return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, allowDuplicates } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
