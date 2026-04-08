"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

interface Coupon {
  code: string;
  discount: number; // percentage
  minOrder: number;
  description: string;
}

const FALLBACK_COUPONS: Coupon[] = [
  { code: "WELCOME10", discount: 10, minOrder: 0, description: "10% off your first order" },
  { code: "BREW20", discount: 20, minOrder: 2000, description: "20% off orders over ₹2,000" },
  { code: "COFFEE15", discount: 15, minOrder: 1000, description: "15% off orders over ₹1,000" },
  { code: "FREESHIP", discount: 5, minOrder: 0, description: "Free shipping equivalent" },
];

function getActiveCoupons(): Coupon[] {
  if (typeof window === "undefined") return FALLBACK_COUPONS;
  try {
    const stored = localStorage.getItem("cc-admin-coupons");
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed
        .filter((c: { active?: boolean }) => c.active !== false)
        .map((c: { code: string; discount: number; minOrder: number; description: string }) => ({
          code: c.code, discount: c.discount, minOrder: c.minOrder, description: c.description,
        }));
    }
  } catch { /* fallback */ }
  return FALLBACK_COUPONS;
}

interface CouponContextType {
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string, orderTotal: number) => { success: boolean; message: string };
  removeCoupon: () => void;
  getDiscount: (subtotal: number) => number;
}

const CouponContext = createContext<CouponContextType | null>(null);

export function CouponProvider({ children }: { children: ReactNode }) {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = useCallback((code: string, orderTotal: number): { success: boolean; message: string } => {
    const validCoupons = getActiveCoupons();
    const coupon = validCoupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) return { success: false, message: "Invalid coupon code" };
    if (orderTotal < coupon.minOrder) return { success: false, message: `Minimum order of ₹${coupon.minOrder.toLocaleString("en-IN")} required` };
    setAppliedCoupon(coupon);
    return { success: true, message: `${coupon.description} applied!` };
  }, []);

  const removeCoupon = useCallback(() => setAppliedCoupon(null), []);

  const getDiscount = useCallback(
    (subtotal: number) => (appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0),
    [appliedCoupon]
  );

  const value = useMemo(() => ({ appliedCoupon, applyCoupon, removeCoupon, getDiscount }), [appliedCoupon, applyCoupon, removeCoupon, getDiscount]);

  return <CouponContext.Provider value={value}>{children}</CouponContext.Provider>;
}

export function useCoupon() {
  const context = useContext(CouponContext);
  if (!context) throw new Error("useCoupon must be used within a CouponProvider");
  return context;
}
