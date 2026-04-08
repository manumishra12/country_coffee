"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAdmin } from "@/store/admin-context";
import { SearchInput } from "@/components/admin/search-input";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { EmptyState } from "@/components/admin/empty-state";
import { formatPrice } from "@/lib/format";
import { TableSkeleton } from "@/components/admin/admin-skeleton";
import { categories } from "@/data/products";

export default function AdminProductsPage() {
  const router = useRouter();
  const { products, deleteProduct, hydrated } = useAdmin();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (!hydrated) return <TableSkeleton rows={6} />;

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <SearchInput value={search} onChange={setSearch} placeholder="Search products..." />
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-espresso text-cream text-sm font-accent hover:bg-espresso-light transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-accent whitespace-nowrap transition-colors ${
              category === cat.id
                ? "bg-espresso text-cream"
                : "bg-white text-warm-gray hover:text-espresso border border-latte-light/30"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Table */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No products found"
          message={search ? "Try a different search term" : "Add your first product to get started"}
          action={!search ? { label: "Add Product", onClick: () => router.push("/admin/products/new") } : undefined}
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-latte-light/30 bg-cream/30">
                  <th className="px-3 sm:px-5 py-3 text-[10px] sm:text-[11px] font-accent uppercase tracking-widest text-warm-gray">Product</th>
                  <th className="px-3 sm:px-5 py-3 text-[10px] sm:text-[11px] font-accent uppercase tracking-widest text-warm-gray">Category</th>
                  <th className="px-3 sm:px-5 py-3 text-[10px] sm:text-[11px] font-accent uppercase tracking-widest text-warm-gray">Price</th>
                  <th className="px-3 sm:px-5 py-3 text-[10px] sm:text-[11px] font-accent uppercase tracking-widest text-warm-gray">Badge</th>
                  <th className="px-3 sm:px-5 py-3 text-[10px] sm:text-[11px] font-accent uppercase tracking-widest text-warm-gray text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-latte-light/15 last:border-0 hover:bg-cream/30 transition-colors"
                  >
                    <td className="px-3 sm:px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-cream shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-body text-espresso font-medium truncate max-w-[200px]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-5 py-3">
                      <span className="text-xs font-accent text-warm-gray capitalize">{product.category}</span>
                    </td>
                    <td className="px-3 sm:px-5 py-3 text-sm font-accent text-espresso">{formatPrice(product.price)}</td>
                    <td className="px-3 sm:px-5 py-3">
                      {product.badge && (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-accent uppercase bg-mocha/10 text-mocha">
                          {product.badge}
                        </span>
                      )}
                    </td>
                    <td className="px-3 sm:px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          aria-label={`Edit ${product.name}`}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-warm-gray hover:text-espresso hover:bg-cream transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(product.id)}
                          aria-label={`Delete ${product.name}`}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-warm-gray hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        open={deleteId !== null}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
