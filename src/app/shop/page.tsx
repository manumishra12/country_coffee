"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { products, categories, type Product } from "@/data/products";
import { getProductRating } from "@/data/reviews";
import { ProductCard } from "@/components/product-card";

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const roastLevels = ["light", "medium", "dark"] as const;

const priceRanges = [
  { label: "Under $20", min: 0, max: 20 },
  { label: "$20 – $35", min: 20, max: 35 },
  { label: "$35 – $50", min: 35, max: 50 },
  { label: "Over $50", min: 50, max: Infinity },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [selectedRoast, setSelectedRoast] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const activeFilters = [activeCategory !== "all", selectedRoast, selectedPrice !== null].filter(Boolean).length;

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") result = result.filter((p) => p.category === activeCategory);
    if (selectedRoast) result = result.filter((p) => p.roast === selectedRoast);
    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice];
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => getProductRating(b.id).avg - getProductRating(a.id).avg); break;
      case "newest": result.sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0)); break;
    }

    return result;
  }, [activeCategory, sort, selectedRoast, selectedPrice]);

  const clearFilters = () => {
    setActiveCategory("all");
    setSelectedRoast(null);
    setSelectedPrice(null);
  };

  return (
    <section className="pt-28 sm:pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 sm:mb-12">
          <p className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3">The Collection</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-espresso">Shop</h1>
        </motion.div>

        {/* Category Tabs + Sort + Filter Toggle */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full font-accent text-[10px] sm:text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeCategory === cat.id ? "bg-espresso text-cream" : "bg-espresso/5 text-espresso/60 hover:bg-espresso/10"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort + Filters row */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-accent text-xs transition-all ${
                showFilters || activeFilters > 0 ? "bg-mocha text-cream" : "border border-espresso/15 text-espresso/60 hover:border-espresso/30"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters {activeFilters > 0 && `(${activeFilters})`}
            </button>

            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-espresso/15 font-accent text-xs text-espresso/60 hover:border-espresso/30 transition-colors"
              >
                {sortOptions.find((s) => s.value === sort)?.label}
                <ChevronDown size={12} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-espresso/10 overflow-hidden z-30"
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSort(opt.value); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 font-accent text-xs transition-colors ${
                          sort === opt.value ? "bg-cream text-mocha font-medium" : "text-espresso/60 hover:bg-cream/50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-cream rounded-2xl p-5 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Roast Level */}
                  <div>
                    <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-espresso/40 mb-3">Roast Level</p>
                    <div className="flex flex-wrap gap-2">
                      {roastLevels.map((r) => (
                        <button
                          key={r}
                          onClick={() => setSelectedRoast(selectedRoast === r ? null : r)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-accent capitalize transition-all ${
                            selectedRoast === r ? "bg-espresso text-cream" : "bg-white text-espresso/60 hover:bg-espresso/5"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-espresso/40 mb-3">Price Range</p>
                    <div className="flex flex-wrap gap-2">
                      {priceRanges.map((r, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedPrice(selectedPrice === i ? null : i)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-accent transition-all ${
                            selectedPrice === i ? "bg-espresso text-cream" : "bg-white text-espresso/60 hover:bg-espresso/5"
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear */}
                  <div className="flex items-end">
                    {activeFilters > 0 && (
                      <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-mocha font-accent hover:underline">
                        <X size={12} /> Clear all filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="font-accent text-xs text-espresso/40 mb-6">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${sort}-${selectedRoast}-${selectedPrice}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {filtered.map((product: Product, i: number) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.4 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-espresso/40 font-accent text-sm mb-4">No products match your filters.</p>
            <button onClick={clearFilters} className="text-mocha font-accent text-sm hover:underline">Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
