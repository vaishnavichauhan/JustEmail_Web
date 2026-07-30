"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  providerId: string;
  providerName: string;
  planName: string;
  price: string;
  amountNumeric: number;
  period: string;
  logo: string;
  storage: string;
  sla: string;
  attachment: string;
  userCount: number;
  features: string[];
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (plan: Omit<CartItem, "userCount">, userCount?: number) => void;
  removeFromCart: (planId: string) => void;
  updateQuantity: (planId: string, count: number) => void;
  clearCart: () => void;
  isInCart: (planId: string) => boolean;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  isInCart: () => false,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("justEmails_cartItems");
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem("justEmails_cartItems", JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = (plan: Omit<CartItem, "userCount" | "amountNumeric"> & { amountNumeric?: number }, userCount = 1) => {
    const numericPrice = typeof plan.amountNumeric === "number" && !isNaN(plan.amountNumeric)
      ? plan.amountNumeric
      : parseInt(String(plan.price || "136").replace(/[^\d]/g, ""), 10) || 136;

    const fullPlan: CartItem = {
      ...plan,
      amountNumeric: numericPrice,
      userCount
    };

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === plan.id);
      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex].userCount += userCount;
        updated[existingIndex].amountNumeric = numericPrice;
      } else {
        updated = [...prev, fullPlan];
      }
      try {
        localStorage.setItem("justEmails_cartItems", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const removeFromCart = (planId: string) => {
    const updated = cartItems.filter((item) => item.id !== planId);
    saveCart(updated);
  };

  const updateQuantity = (planId: string, count: number) => {
    if (count <= 0) {
      removeFromCart(planId);
      return;
    }
    const updated = cartItems.map((item) => 
      item.id === planId ? { ...item, userCount: count } : item
    );
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const isInCart = (planId: string) => {
    return cartItems.some((item) => item.id === planId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
