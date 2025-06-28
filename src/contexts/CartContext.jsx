// contexts/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const updateQuantity = (id, quantity) => {
        setItems(prev =>
            prev.map(item => item.id === id ? { ...item, quantity } : item)
        );
    };

    const removeFromCart = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => setItems([]);

    const getCartTotal = () =>
        items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const getCartItemsCount = () =>
        items.reduce((count, item) => count + item.quantity, 0);

    const addToCart = (product) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };
      
    return (
        <CartContext.Provider
            value={{
                items,
                updateQuantity,
                removeFromCart,
                clearCart,
                getCartTotal,
                getCartItemsCount,
                addToCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
