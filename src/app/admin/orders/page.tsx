"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useAdmin } from "@/store/admin-context";
import { SearchInput } from "@/components/admin/search-input";
import { StatusBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/empty-state";
import { TableSkeleton } from "@/components/admin/admin-skeleton";
import { formatPrice } from "@/lib/format";

const statusFilters = [
  { id: "all", label: "All" },
  { id: "confirmed", label: "Confirmed" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "out_for_delivery", label: "Out for Delivery" },
  { id: "delivered", label: "Delivered" },
];

export default function AdminOrdersPage() {
  const { orders, hydrated } = useAdmin();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length };
    for (const order of orders) {
      counts[order.status] = (counts[order.status] || 0) + 1;
    }
    return counts;
  }, [orders]);

  const filtered = useMemo(() => {
    return orders
      .filter((o) => {
        const matchesStatus = statusFilter === "all" || o.status === statusFilter;
        const matchesSearch = search === "" ||
          o.id.toLowerCase().includes(search.toLowerCase()) ||
          o.customerName.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, statusFilter, search]);

  if (!hydrated) return <TableSkeleton rows={6} />;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="max-w-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by order ID or customer..." />
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusFilters.map((sf) => (
          <button
            key={sf.id}
            onClick={() => setStatusFilter(sf.id)}
            className={`px-4 py-2 rounded-xl text-xs font-accent whitespace-nowrap transition-colors flex items-center gap-2 ${
              statusFilter === sf.id
                ? "bg-espresso text-cream"
                : "bg-white text-warm-gray hover:text-espresso border border-latte-light/30"
            }`}
          >
            {sf.label}
            {(statusCounts[sf.id] || 0) > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${statusFilter === sf.id ? "bg-cream/20" : "bg-latte-light/50"}`}>
                {statusCounts[sf.id]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      {filtered.length === 0 ? (
        <EmptyState title="No orders found" message={search ? "Try a different search term" : "No orders match this filter"} />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-latte-light/30 bg-cream/30">
                  <th className="px-5 py-3 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Order ID</th>
                  <th className="px-5 py-3 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Customer</th>
                  <th className="px-5 py-3 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Items</th>
                  <th className="px-5 py-3 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Total</th>
                  <th className="px-5 py-3 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Date</th>
                  <th className="px-5 py-3 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Status</th>
                  <th className="px-5 py-3 text-[11px] font-accent uppercase tracking-widest text-warm-gray text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-latte-light/15 last:border-0 hover:bg-cream/30 transition-colors"
                  >
                    <td className="px-5 py-3 text-sm font-accent text-espresso">{order.id}</td>
                    <td className="px-5 py-3 text-sm text-espresso">{order.customerName}</td>
                    <td className="px-5 py-3 text-sm text-warm-gray">{order.items.reduce((s, it) => s + it.quantity, 0)}</td>
                    <td className="px-5 py-3 text-sm font-accent text-espresso">{formatPrice(order.total)}</td>
                    <td className="px-5 py-3 text-sm text-warm-gray">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        aria-label={`View order ${order.id}`}
                        className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-warm-gray hover:text-espresso hover:bg-cream transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
