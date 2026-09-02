import { createContext, useContext, useEffect, useState } from "react";
import { getProduct } from "../data/products";

const CART_KEY = "nf_cart";
const CartContext = createContext(null);

function loadCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(id, size, qty) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === id && item.size === size ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { id, size, qty }];
    });
  }

  function updateQty(id, size, qty) {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((item) => !(item.id === id && item.size === size));
      return prev.map((item) => (item.id === id && item.size === size ? { ...item, qty } : item));
    });
  }

  function removeFromCart(id, size) {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  }

  function clearCart() {
    setCart([]);
  }

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => {
    const product = getProduct(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, clearCart, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
