"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductImage } from "@/components/product-image";
import Link from "next/link";

export function SearchButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="p-2 hover:bg-espresso/5 rounded-full transition-colors"
      aria-label="Search"
    >
      <Search size={20} strokeWidth={1.5} />
    </button>
  );
}

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        isOpen ? onClose() : undefined;
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.origin?.toLowerCase().includes(q)
    );
  }, [query]);

  const suggestions = useMemo(() => {
    if (query.trim()) return [];
    return ["Sunrise Blend", "Pour Over", "Ceramic Mug", "Dark Roast"];
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[90] px-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 sm:px-6 py-4 sm:py-5 border-b border-espresso/10">
                <Search size={20} className="text-espresso/30 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, origins, roasts..."
                  className="flex-1 bg-transparent text-espresso placeholder:text-espresso/30 font-body text-base focus:outline-none"
                />
                <kbd className="hidden sm:flex items-center gap-1 text-[10px] text-espresso/30 font-accent bg-espresso/5 px-2 py-1 rounded-md">
                  ESC
                </kbd>
                <button onClick={onClose} className="p-1 hover:bg-espresso/5 rounded-full">
                  <X size={16} className="text-espresso/40" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                {/* Suggestions when empty */}
                {suggestions.length > 0 && (
                  <div className="p-4">
                    <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-espresso/30 mb-3 px-2">Popular searches</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="px-4 py-2.5 bg-cream rounded-full font-accent text-xs text-espresso/60 hover:bg-cream-dark transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {query.trim() && results.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-espresso/40 font-accent text-sm">No products found for &ldquo;{query}&rdquo;</p>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="p-2">
                    <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-espresso/30 mb-2 px-4 pt-2">
                      {results.length} result{results.length !== 1 ? "s" : ""}
                    </p>
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/shop/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 px-4 py-3.5 sm:py-3 rounded-2xl hover:bg-cream transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-cream-dark overflow-hidden relative shrink-0">
                          <ProductImage src={product.image} alt={product.name} category={product.category} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-sm font-semibold text-espresso truncate group-hover:text-mocha transition-colors">
                            {product.name}
                          </p>
                          <p className="text-xs text-espresso/40 font-accent capitalize">{product.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-accent text-sm font-medium text-espresso">₹{product.price.toLocaleString("en-IN")}</span>
                          <ArrowRight size={14} className="text-espresso/20 group-hover:text-mocha transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
