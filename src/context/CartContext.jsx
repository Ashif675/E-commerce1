// ─── Cart Context ─────────────────────────────────────────────────────
// Manages shopping cart state. Uses localStorage for persistence.
// Syncs to Firestore when user is logged in.

import { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync cart to Firestore when user is logged in
  useEffect(() => {
    if (user && cartItems.length > 0) {
      setDoc(doc(db, 'cart', user.uid), { items: cartItems, updatedAt: new Date().toISOString() })
        .catch(() => {});
    }
  }, [cartItems, user]);

  // Load cart from Firestore when user logs in
  useEffect(() => {
    async function loadFirestoreCart() {
      if (user) {
        try {
          const cartDoc = await getDoc(doc(db, 'cart', user.uid));
          if (cartDoc.exists() && cartDoc.data().items?.length) {
            setCartItems(cartDoc.data().items);
          }
        } catch {
          // Use local cart as fallback
        }
      }
    }
    loadFirestoreCart();
  }, [user]);

  // Add item to cart (or increase qty if already present)
  function addToCart(product) {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1
      }];
    });
  }

  // Remove item from cart
  function removeFromCart(productId) {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }

  // Update quantity for an item
  function updateQuantity(productId, qty) {
    if (qty <= 0) return removeFromCart(productId);
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, qty } : item
      )
    );
  }

  // Clear entire cart
  function clearCart() {
    setCartItems([]);
    if (user) {
      setDoc(doc(db, 'cart', user.uid), { items: [], updatedAt: new Date().toISOString() })
        .catch(() => {});
    }
  }

  // Calculate total price
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const value = { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
