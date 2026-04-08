"use client";

import { createContext, useContext, useCallback, useMemo, useState, useEffect, type ReactNode } from "react";

interface WishlistContextType {
  items: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cc-wishlist");
    if (stored) setItems(JSON.parse(stored));
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (hydrated) localStorage.setItem("cc-wishlist", JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((id: string) => {
    setItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i !== id));
  }, []);

  const toggleItem = useCallback((id: string) => {
    setItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }, []);

  const isWishlisted = useCallback((id: string) => items.includes(id), [items]);

  const count = items.length;

  const value = useMemo(
    () => ({ items, addItem, removeItem, toggleItem, isWishlisted, count }),
    [items, addItem, removeItem, toggleItem, isWishlisted, count]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
