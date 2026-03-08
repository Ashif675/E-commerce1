// ─── Wishlist Context ─────────────────────────────────────────────────
// Manages wishlist state with localStorage + Firestore sync.

import { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useAuth();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) setWishlistItems(JSON.parse(saved));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Load from Firestore when user logs in
  useEffect(() => {
    async function loadWishlist() {
      if (user) {
        try {
          const wishDoc = await getDoc(doc(db, 'wishlists', user.uid));
          if (wishDoc.exists() && wishDoc.data().items?.length) {
            setWishlistItems(wishDoc.data().items);
          }
        } catch {
          // fallback to local
        }
      }
    }
    loadWishlist();
  }, [user]);

  // Sync to Firestore
  useEffect(() => {
    if (user) {
      setDoc(doc(db, 'wishlists', user.uid), { items: wishlistItems, updatedAt: new Date().toISOString() })
        .catch(() => {});
    }
  }, [wishlistItems, user]);

  function addToWishlist(product) {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      }];
    });
  }

  function removeFromWishlist(productId) {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  }

  function isWishlisted(productId) {
    return wishlistItems.some(item => item.id === productId);
  }

  const value = { wishlistItems, addToWishlist, removeFromWishlist, isWishlisted };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
