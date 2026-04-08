"use client";

import { createContext, useContext, useCallback, useMemo, useState, useEffect, type ReactNode } from "react";
import { products as defaultProducts, type Product } from "@/data/products";
import { mockOrders, defaultCoupons, defaultSettings, type AdminOrder, type Customer, type AdminCoupon, type StoreSettings } from "@/data/mock-orders";

interface AdminContextType {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  // Orders
  orders: AdminOrder[];
  updateOrderStatus: (id: string, status: AdminOrder["status"]) => void;
  updateOrderNotes: (id: string, notes: string) => void;
  // Customers
  customers: Customer[];
  // Coupons
  coupons: AdminCoupon[];
  addCoupon: (coupon: Omit<AdminCoupon, "id" | "usageCount" | "createdAt">) => void;
  updateCoupon: (id: string, data: Partial<AdminCoupon>) => void;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;
  // Settings
  settings: StoreSettings;
  updateSettings: (settings: Partial<StoreSettings>) => void;
  // State
  hydrated: boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

function deriveCustomers(orders: AdminOrder[]): Customer[] {
  const map = new Map<string, Customer>();
  for (const order of orders) {
    const key = order.customerEmail;
    const existing = map.get(key);
    if (existing) {
      existing.totalOrders += 1;
      existing.totalSpent += order.total;
      if (order.createdAt > existing.lastOrderDate) existing.lastOrderDate = order.createdAt;
      existing.orderIds.push(order.id);
    } else {
      map.set(key, {
        id: key.replace(/[^a-z0-9]/g, "-"),
        name: order.customerName,
        email: order.customerEmail,
        phone: order.shipping.phone,
        city: order.shipping.city,
        totalOrders: 1,
        totalSpent: order.total,
        lastOrderDate: order.createdAt,
        orderIds: [order.id],
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage or seed defaults
  useEffect(() => {
    const storedProducts = localStorage.getItem("cc-admin-products");
    const storedOrders = localStorage.getItem("cc-admin-orders");
    const storedCoupons = localStorage.getItem("cc-admin-coupons");
    const storedSettings = localStorage.getItem("cc-admin-settings");

    setProducts(storedProducts ? JSON.parse(storedProducts) : defaultProducts);
    setOrders(storedOrders ? JSON.parse(storedOrders) : mockOrders);
    setCoupons(storedCoupons ? JSON.parse(storedCoupons) : defaultCoupons);
    if (storedSettings) setSettings(JSON.parse(storedSettings));
    setHydrated(true);
  }, []);

  // Persist on changes
  useEffect(() => {
    if (hydrated) localStorage.setItem("cc-admin-products", JSON.stringify(products));
  }, [products, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("cc-admin-orders", JSON.stringify(orders));
  }, [orders, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("cc-admin-coupons", JSON.stringify(coupons));
  }, [coupons, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("cc-admin-settings", JSON.stringify(settings));
  }, [settings, hydrated]);

  // Product CRUD
  const addProduct = useCallback((product: Product) => {
    setProducts((prev) => [...prev, product]);
  }, []);

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Order management
  const updateOrderStatus = useCallback((id: string, status: AdminOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const statuses = ["confirmed", "processing", "shipped", "out_for_delivery", "delivered"];
        const idx = statuses.indexOf(status);
        const updatedSteps = o.trackingSteps.map((step, i) => ({ ...step, completed: i <= idx }));
        return { ...o, status, trackingSteps: updatedSteps, updatedAt: new Date().toISOString() };
      })
    );
  }, []);

  const updateOrderNotes = useCallback((id: string, notes: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, notes, updatedAt: new Date().toISOString() } : o)));
  }, []);

  // Customers (derived)
  const customers = useMemo(() => deriveCustomers(orders), [orders]);

  // Coupon CRUD
  const addCoupon = useCallback((data: Omit<AdminCoupon, "id" | "usageCount" | "createdAt">) => {
    const coupon: AdminCoupon = {
      ...data,
      id: "cpn-" + Date.now().toString(36),
      usageCount: 0,
      createdAt: new Date().toISOString(),
    };
    setCoupons((prev) => [...prev, coupon]);
  }, []);

  const updateCoupon = useCallback((id: string, data: Partial<AdminCoupon>) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  }, []);

  const toggleCoupon = useCallback((id: string) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  }, []);

  const deleteCoupon = useCallback((id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // Settings
  const updateSettingsFn = useCallback((data: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...data }));
  }, []);

  const value = useMemo(
    () => ({
      products, addProduct, updateProduct, deleteProduct,
      orders, updateOrderStatus, updateOrderNotes,
      customers,
      coupons, addCoupon, updateCoupon, toggleCoupon, deleteCoupon,
      settings, updateSettings: updateSettingsFn,
      hydrated,
    }),
    [products, addProduct, updateProduct, deleteProduct, orders, updateOrderStatus, updateOrderNotes, customers, coupons, addCoupon, updateCoupon, toggleCoupon, deleteCoupon, settings, updateSettingsFn, hydrated]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AdminProvider");
  return context;
}
