"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, X, Tag, ToggleLeft, ToggleRight } from "lucide-react";
import { useAdmin } from "@/store/admin-context";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { EmptyState } from "@/components/admin/empty-state";
import { formatPrice } from "@/lib/format";

export default function AdminCouponsPage() {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon, hydrated } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ code: "", discount: 10, minOrder: 0, description: "", active: true });

  if (!hydrated) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim()) return;
    addCoupon({
      code: form.code.toUpperCase(),
      discount: form.discount,
      minOrder: form.minOrder,
      description: form.description,
      active: form.active,
    });
    setForm({ code: "", discount: 10, minOrder: 0, description: "", active: true });
    setShowForm(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteCoupon(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-warm-gray font-accent">{coupons.length} coupon{coupons.length !== 1 ? "s" : ""}</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-espresso text-cream text-sm font-accent hover:bg-espresso-light transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Coupon"}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAdd}
          className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-4 sm:p-6"
        >
          <h3 className="font-display text-base text-espresso mb-4">New Coupon</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Code *</label>
              <input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso uppercase focus:outline-none focus:border-mocha font-accent"
                placeholder="SUMMER25"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Discount %</label>
              <input
                type="number"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha font-body"
                min={1} max={100}
              />
            </div>
            <div>
              <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Min Order (₹)</label>
              <input
                type="number"
                value={form.minOrder}
                onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha font-body"
                min={0}
              />
            </div>
            <div>
              <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Description</label>
              <input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha font-body"
                placeholder="Summer sale discount"
              />
            </div>
          </div>
          <button type="submit" className="mt-4 px-6 py-2.5 rounded-xl bg-espresso text-cream text-sm font-accent hover:bg-espresso-light transition-colors">
            Create Coupon
          </button>
        </motion.form>
      )}

      {/* Coupon Cards */}
      {coupons.length === 0 ? (
        <EmptyState icon={Tag} title="No coupons yet" message="Create your first discount coupon" action={{ label: "Add Coupon", onClick: () => setShowForm(true) }} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((coupon, i) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white rounded-2xl shadow-sm border p-5 ${coupon.active ? "border-latte-light/30" : "border-latte-light/20 opacity-60"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="px-3 py-1.5 rounded-lg bg-mocha/10 font-accent text-sm text-mocha tracking-wider">
                  {coupon.code}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleCoupon(coupon.id)}
                    className={`text-warm-gray hover:text-espresso transition-colors ${coupon.active ? "text-forest" : ""}`}
                    title={coupon.active ? "Deactivate" : "Activate"}
                  >
                    {coupon.active ? <ToggleRight className="w-6 h-6 text-forest" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={() => setDeleteId(coupon.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-warm-gray hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="font-display text-2xl text-espresso mb-1">{coupon.discount}% off</p>
              <p className="text-xs text-warm-gray font-body mb-3">{coupon.description}</p>
              <div className="flex items-center justify-between text-[11px] font-accent text-warm-gray/70">
                <span>{coupon.minOrder > 0 ? `Min ${formatPrice(coupon.minOrder)}` : "No minimum"}</span>
                <span>{coupon.usageCount} uses</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={deleteId !== null}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon? Customers won't be able to use it anymore."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
