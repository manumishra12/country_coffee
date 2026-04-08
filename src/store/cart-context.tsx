"use client";

import { createContext, useContext, useCallback, useMemo, useState, useEffect, type ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered";
  createdAt: string;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
}

export interface TrackingStep {
  label: string;
  location: string;
  time: string;
  completed: boolean;
  coordinates: [number, number]; // lat, lng for map
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  // Order state
  currentOrder: Order | null;
  placeOrder: (shipping: ShippingAddress, paymentMethod: string) => Order;
}

const CartContext = createContext<CartContextType | null>(null);

function generateOrderId() {
  return "CC-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
}

function generateTrackingSteps(): TrackingStep[] {
  const now = new Date();
  return [
    { label: "Order Confirmed", location: "Country Coffee HQ, Coorg", time: now.toISOString(), completed: true, coordinates: [12.4244, 75.7382] },
    { label: "Roasted & Packed", location: "Roastery, Coorg", time: new Date(now.getTime() + 3600000).toISOString(), completed: true, coordinates: [12.4300, 75.7400] },
    { label: "Shipped", location: "Coorg Distribution Center", time: new Date(now.getTime() + 7200000).toISOString(), completed: true, coordinates: [12.9716, 77.5946] },
    { label: "In Transit", location: "Regional Hub", time: new Date(now.getTime() + 18000000).toISOString(), completed: true, coordinates: [17.3850, 78.4867] },
    { label: "Out for Delivery", location: "Local Delivery Center", time: new Date(now.getTime() + 28800000).toISOString(), completed: false, coordinates: [19.0760, 72.8777] },
    { label: "Delivered", location: "Your Doorstep", time: new Date(now.getTime() + 36000000).toISOString(), completed: false, coordinates: [19.0760, 72.8777] },
  ];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cc-cart");
    if (stored) setItems(JSON.parse(stored));
    setHydrated(true);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (hydrated) localStorage.setItem("cc-cart", JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const placeOrder = useCallback(
    (shipping: ShippingAddress, paymentMethod: string): Order => {
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shippingCost = subtotal > 2000 ? 0 : 99;
      const tax = subtotal * 0.08;
      const estimatedDate = new Date();
      estimatedDate.setDate(estimatedDate.getDate() + 5);

      const order: Order = {
        id: generateOrderId(),
        items: [...items],
        shipping,
        subtotal,
        shippingCost,
        tax,
        total: subtotal + shippingCost + tax,
        paymentMethod,
        status: "shipped",
        createdAt: new Date().toISOString(),
        estimatedDelivery: estimatedDate.toISOString(),
        trackingSteps: generateTrackingSteps(),
      };

      setCurrentOrder(order);
      setItems([]);
      return order;
    },
    [items]
  );

  const value = useMemo(
    () => ({
      items, addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice, isOpen, setIsOpen,
      currentOrder, placeOrder,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isOpen, currentOrder, placeOrder]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
