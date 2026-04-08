"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, CheckCircle2 } from "lucide-react";
import { useAdmin } from "@/store/admin-context";

export default function AdminSettingsPage() {
  const { settings, updateSettings, hydrated } = useAdmin();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [init, setInit] = useState(false);

  if (!hydrated) return null;

  if (!init) {
    setForm(settings);
    setInit(true);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-6 sm:p-8 space-y-6"
      >
        <div>
          <h3 className="font-display text-lg text-espresso mb-1">Store Settings</h3>
          <p className="text-sm text-warm-gray font-body">Configure your store preferences</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Store Name</label>
            <input
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                value={form.taxRate}
                onChange={(e) => setForm({ ...form, taxRate: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body"
                min={0} max={100} step={0.5}
              />
            </div>
            <div>
              <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Shipping Cost (₹)</label>
              <input
                type="number"
                value={form.shippingCost}
                onChange={(e) => setForm({ ...form, shippingCost: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body"
                min={0}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Free Shipping Threshold (₹)</label>
            <input
              type="number"
              value={form.freeShippingThreshold}
              onChange={(e) => setForm({ ...form, freeShippingThreshold: Number(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body"
              min={0}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Contact Email</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body"
              />
            </div>
            <div>
              <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Contact Phone</label>
              <input
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-espresso text-cream font-accent text-sm uppercase tracking-widest hover:bg-espresso-light transition-colors flex items-center gap-2"
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Settings
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
}
