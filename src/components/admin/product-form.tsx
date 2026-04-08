"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, ImageIcon } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductFormProps {
  initial?: Product;
  onSubmit: (product: Product) => void;
  submitLabel?: string;
}

export function ProductForm({ initial, onSubmit, submitLabel = "Save Product" }: ProductFormProps) {
  const [form, setForm] = useState<Product>(
    initial || {
      id: "",
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "beans",
      badge: "",
      origin: "",
      roast: undefined,
      weight: "",
      details: [],
    }
  );
  const [detailsText, setDetailsText] = useState(initial?.details?.join(", ") || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string | number | undefined) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Product name is required";
    if (form.price <= 0) errs.price = "Price must be greater than 0";
    if (!form.image.trim()) errs.image = "Image URL is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const id = form.id || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const details = detailsText.split(",").map((d) => d.trim()).filter(Boolean);

    onSubmit({ ...form, id, details, badge: form.badge || undefined });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* Main Fields */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-latte-light/30 p-4 sm:p-6 space-y-5">
        <h3 className="font-display text-lg text-espresso">Product Information</h3>

        <div>
          <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Name *</label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-400" : "border-latte-light"} bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body`}
            placeholder="e.g. Mountain Reserve Blend"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 font-accent">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body resize-none"
            placeholder="Describe the product..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Price (₹) *</label>
            <input
              type="number"
              value={form.price || ""}
              onChange={(e) => update("price", Number(e.target.value))}
              className={`w-full px-4 py-3 rounded-xl border ${errors.price ? "border-red-400" : "border-latte-light"} bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body`}
              placeholder="599"
              min={0}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1 font-accent">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body"
            >
              <option value="beans">Coffee Beans</option>
              <option value="mugs">Mugs & Tumblers</option>
              <option value="equipment">Equipment</option>
              <option value="merch">Merch</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Origin</label>
            <input
              value={form.origin || ""}
              onChange={(e) => update("origin", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body"
              placeholder="Ethiopia"
            />
          </div>
          <div>
            <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Roast Level</label>
            <select
              value={form.roast || ""}
              onChange={(e) => update("roast", e.target.value || undefined)}
              className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body"
            >
              <option value="">None</option>
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Weight</label>
            <input
              value={form.weight || ""}
              onChange={(e) => update("weight", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body"
              placeholder="250g"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Badge</label>
          <input
            value={form.badge || ""}
            onChange={(e) => update("badge", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body"
            placeholder="Bestseller, New, Limited..."
          />
        </div>

        <div>
          <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Details (comma-separated)</label>
          <input
            value={detailsText}
            onChange={(e) => setDetailsText(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-latte-light bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body"
            placeholder="Single origin, Hand-picked, Sun-dried"
          />
        </div>
      </div>

      {/* Image + Save */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-4 sm:p-6">
          <h3 className="font-display text-lg text-espresso mb-4">Product Image</h3>
          <div>
            <label className="block text-xs font-accent uppercase tracking-widest text-espresso/60 mb-2">Image URL *</label>
            <input
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${errors.image ? "border-red-400" : "border-latte-light"} bg-cream/30 text-espresso focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20 transition-colors font-body text-sm`}
              placeholder="https://images.unsplash.com/..."
            />
            {errors.image && <p className="text-red-500 text-xs mt-1 font-accent">{errors.image}</p>}
          </div>

          {form.image ? (
            <div className="mt-4 rounded-xl overflow-hidden border border-latte-light/30 aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="mt-4 rounded-xl border-2 border-dashed border-latte-light flex flex-col items-center justify-center aspect-square bg-cream/30">
              <ImageIcon className="w-10 h-10 text-latte mb-2" />
              <p className="text-xs text-warm-gray font-accent">Paste image URL above</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-espresso text-cream font-accent text-sm uppercase tracking-widest hover:bg-espresso-light transition-colors flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          {submitLabel}
        </button>
      </div>
    </motion.form>
  );
}
