"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { AdminOrder } from "@/data/mock-orders";
import { formatPrice } from "@/lib/format";

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      key: d.toISOString().split("T")[0],
      label: d.toLocaleDateString("en-IN", { weekday: "short" }),
    });
  }
  return days;
}

export function RevenueChart({ orders }: { orders: AdminOrder[] }) {
  const days = useMemo(() => getLast7Days(), []);

  const data = useMemo(() => {
    return days.map((day) => {
      const dayOrders = orders.filter((o) => o.createdAt.split("T")[0] === day.key);
      const revenue = dayOrders.reduce((sum, o) => sum + o.total, 0);
      return { ...day, revenue };
    });
  }, [orders, days]);

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);
  const totalWeek = data.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-latte-light/30">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-display text-lg text-espresso">Revenue</h3>
          <p className="text-xs font-accent text-warm-gray">Last 7 days</p>
        </div>
        <p className="font-display text-xl text-espresso">{formatPrice(totalWeek)}</p>
      </div>

      <div className="flex items-end gap-2 sm:gap-3 h-40">
        {data.map((day, i) => {
          const height = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0;
          return (
            <div key={day.key} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative flex items-end justify-center" style={{ height: "100%" }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(height, 2)}%` }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                  className={`w-full max-w-[40px] rounded-t-lg ${day.revenue > 0 ? "bg-gradient-to-t from-mocha to-latte" : "bg-latte-light/30"}`}
                  title={formatPrice(day.revenue)}
                />
              </div>
              <span className="text-[10px] font-accent text-warm-gray">{day.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
