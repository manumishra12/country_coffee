"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAdmin } from "@/store/admin-context";
import { SearchInput } from "@/components/admin/search-input";
import { EmptyState } from "@/components/admin/empty-state";
import { TableSkeleton } from "@/components/admin/admin-skeleton";
import { formatPrice } from "@/lib/format";

export default function AdminCustomersPage() {
  const { customers, hydrated } = useAdmin();
  const [search, setSearch] = useState("");

  if (!hydrated) return <TableSkeleton rows={4} />;

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="max-w-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name or email..." />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No customers found" message={search ? "Try a different search term" : "Customers will appear here once orders are placed"} />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-latte-light/30 bg-cream/30">
                  <th className="px-3 sm:px-5 py-3 text-[10px] sm:text-[11px] font-accent uppercase tracking-widest text-warm-gray">Customer</th>
                  <th className="px-3 sm:px-5 py-3 text-[10px] sm:text-[11px] font-accent uppercase tracking-widest text-warm-gray">Email</th>
                  <th className="px-3 sm:px-5 py-3 text-[10px] sm:text-[11px] font-accent uppercase tracking-widest text-warm-gray">City</th>
                  <th className="px-3 sm:px-5 py-3 text-[10px] sm:text-[11px] font-accent uppercase tracking-widest text-warm-gray">Orders</th>
                  <th className="px-3 sm:px-5 py-3 text-[10px] sm:text-[11px] font-accent uppercase tracking-widest text-warm-gray">Total Spent</th>
                  <th className="px-3 sm:px-5 py-3 text-[10px] sm:text-[11px] font-accent uppercase tracking-widest text-warm-gray">Last Order</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer, i) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-latte-light/15 last:border-0 hover:bg-cream/30 transition-colors"
                  >
                    <td className="px-3 sm:px-5 py-3">
                      <Link href={`/admin/customers/${customer.id}`} className="text-sm font-medium text-espresso hover:text-mocha transition-colors">
                        {customer.name}
                      </Link>
                    </td>
                    <td className="px-3 sm:px-5 py-3 text-sm text-warm-gray">{customer.email}</td>
                    <td className="px-3 sm:px-5 py-3 text-sm text-warm-gray">{customer.city}</td>
                    <td className="px-3 sm:px-5 py-3 text-sm font-accent text-espresso">{customer.totalOrders}</td>
                    <td className="px-3 sm:px-5 py-3 text-sm font-accent text-espresso">{formatPrice(customer.totalSpent)}</td>
                    <td className="px-3 sm:px-5 py-3 text-sm text-warm-gray">
                      {new Date(customer.lastOrderDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
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
