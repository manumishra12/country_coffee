"use client";

import { createContext, useContext, useCallback, useMemo, useState, useEffect, type ReactNode } from "react";

interface RecentlyViewedContextType {
  items: string[];
  addItem: (id: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | null>(null);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cc-recently-viewed");
    if (stored) setItems(JSON.parse(stored));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("cc-recently-viewed", JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((id: string) => {
    setItems((prev) => {
      const filtered = prev.filter((i) => i !== id);
      return [id, ...filtered].slice(0, 8);
    });
  }, []);

  const value = useMemo(() => ({ items, addItem }), [items, addItem]);

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>;
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  return context;
}
