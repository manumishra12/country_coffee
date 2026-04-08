"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IndianRupee, ShoppingCart, Package, Users, Plus, Eye, Tag, ArrowUpRight } from "lucide-react";
import { useAdmin } from "@/store/admin-context";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { AdminSkeleton } from "@/components/admin/admin-skeleton";
import { formatPrice } from "@/lib/format";

export default function AdminDashboard() {
  const { orders, products, customers, hydrated } = useAdmin();

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
    return { totalRevenue, recentOrders };
  }, [orders]);

  if (!hydrated) return <AdminSkeleton />;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={formatPrice(stats.totalRevenue)} icon={IndianRupee} color="mocha" trend={{ value: "12%", positive: true }} />
        <StatCard label="Total Orders" value={String(orders.length)} icon={ShoppingCart} color="sage" trend={{ value: "8%", positive: true }} />
        <StatCard label="Active Products" value={String(products.length)} icon={Package} color="forest" />
        <StatCard label="Customers" value={String(customers.length)} icon={Users} color="latte" trend={{ value: "5%", positive: true }} />
      </div>

      {/* Chart + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart orders={orders} />
        </div>

        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-latte-light/30 overflow-hidden">
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-latte-light/30">
            <h3 className="font-display text-lg text-espresso">Recent Orders</h3>
            <Link href="/admin/orders" className="text-xs font-accent text-mocha hover:text-espresso flex items-center gap-1 transition-colors">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-latte-light/20 bg-cream/30">
                  <th className="px-5 py-2.5 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Order</th>
                  <th className="px-5 py-2.5 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Customer</th>
                  <th className="px-5 py-2.5 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Total</th>
                  <th className="px-5 py-2.5 text-[11px] font-accent uppercase tracking-widest text-warm-gray">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-latte-light/10 last:border-0 hover:bg-cream/30 transition-colors">
                    <td className="px-5 py-3 text-sm font-accent text-espresso">{order.id}</td>
                    <td className="px-5 py-3 text-sm text-espresso">{order.customerName}</td>
                    <td className="px-5 py-3 text-sm font-accent text-espresso">{formatPrice(order.total)}</td>
                    <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-display text-lg text-espresso mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: "/admin/products/new", label: "Add Product", desc: "Add a new product to your catalog", icon: Plus, color: "bg-mocha/10 text-mocha" },
            { href: "/admin/orders", label: "View Orders", desc: "Manage and track all orders", icon: Eye, color: "bg-sage/10 text-sage" },
            { href: "/admin/coupons", label: "Manage Coupons", desc: "Create and edit discount codes", icon: Tag, color: "bg-gold/10 text-gold" },
          ].map((action) => (
            <motion.div key={action.href} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={action.href}
                className="block bg-white rounded-2xl p-5 shadow-sm border border-latte-light/30 hover:border-mocha/20 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <p className="font-display text-base text-espresso">{action.label}</p>
                <p className="text-xs text-warm-gray font-body mt-1">{action.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
