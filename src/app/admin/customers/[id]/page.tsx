"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, ShoppingCart, IndianRupee } from "lucide-react";
import { useAdmin } from "@/store/admin-context";
import { StatusBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/empty-state";
import { formatPrice } from "@/lib/format";

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { customers, orders, hydrated } = useAdmin();

  if (!hydrated) return null;

  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return <EmptyState title="Customer not found" message="This customer may not exist." action={{ label: "Back to Customers", onClick: () => router.push("/admin/customers") }} />;
  }

  const customerOrders = orders
    .filter((o) => customer.orderIds.includes(o.id))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const avgOrderValue = customer.totalOrders > 0 ? customer.totalSpent / customer.totalOrders : 0;

  return (
    <div className="space-y-6">
      <button onClick={() => router.push("/admin/customers")} className="inline-flex items-center gap-2 text-sm text-warm-gray hover:text-espresso font-accent transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Customers
      </button>

      {/* Customer Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-5 sm:p-6">
        <h2 className="font-display text-xl text-espresso mb-4">{customer.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-warm-gray"><Mail className="w-4 h-4" /> {customer.email}</div>
          <div className="flex items-center gap-2 text-warm-gray"><Phone className="w-4 h-4" /> {customer.phone}</div>
          <div className="flex items-center gap-2 text-warm-gray"><MapPin className="w-4 h-4" /> {customer.city}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-5">
          <div className="w-9 h-9 rounded-xl bg-mocha/10 flex items-center justify-center mb-2">
            <IndianRupee className="w-4 h-4 text-mocha" />
          </div>
          <p className="font-display text-2xl text-espresso">{formatPrice(customer.totalSpent)}</p>
          <p className="text-xs font-accent text-warm-gray uppercase tracking-widest">Total Spent</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-5">
          <div className="w-9 h-9 rounded-xl bg-sage/10 flex items-center justify-center mb-2">
            <ShoppingCart className="w-4 h-4 text-sage" />
          </div>
          <p className="font-display text-2xl text-espresso">{customer.totalOrders}</p>
          <p className="text-xs font-accent text-warm-gray uppercase tracking-widest">Total Orders</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-5">
          <div className="w-9 h-9 rounded-xl bg-latte/20 flex items-center justify-center mb-2">
            <IndianRupee className="w-4 h-4 text-mocha" />
          </div>
          <p className="font-display text-2xl text-espresso">{formatPrice(avgOrderValue)}</p>
          <p className="text-xs font-accent text-warm-gray uppercase tracking-widest">Avg Order Value</p>
        </motion.div>
      </div>

      {/* Order History */}
      <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-latte-light/30">
          <h3 className="font-display text-base text-espresso">Order History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-latte-light/20 bg-cream/30">
                <th className="px-5 py-2.5 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Order</th>
                <th className="px-5 py-2.5 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Date</th>
                <th className="px-5 py-2.5 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Items</th>
                <th className="px-5 py-2.5 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Total</th>
                <th className="px-5 py-2.5 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Status</th>
              </tr>
            </thead>
            <tbody>
              {customerOrders.map((order) => (
                <tr key={order.id} className="border-b border-latte-light/10 last:border-0 hover:bg-cream/30 transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="text-sm font-accent text-espresso hover:text-mocha transition-colors">
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-sm text-warm-gray">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3 text-sm text-warm-gray">{order.items.reduce((s, it) => s + it.quantity, 0)}</td>
                  <td className="px-5 py-3 text-sm font-accent text-espresso">{formatPrice(order.total)}</td>
                  <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
