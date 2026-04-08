"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "@/store/wishlist-context";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";

export default function WishlistPage() {
  const { items } = useWishlist();
  const wishlisted = products.filter((p) => items.includes(p.id));

  return (
    <section className="pt-28 sm:pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3">Your Favourites</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-espresso">Wishlist</h1>
        </motion.div>

        {wishlisted.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Heart size={48} className="mx-auto text-espresso/15 mb-6" strokeWidth={1} />
            <p className="font-display text-xl text-espresso/40 mb-6">Your wishlist is empty</p>
            <Link href="/shop" className="bg-espresso text-cream px-8 py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-mocha transition-colors">
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {wishlisted.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
