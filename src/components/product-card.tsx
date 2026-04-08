"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { useCart } from "@/store/cart-context";
import { useWishlist } from "@/store/wishlist-context";
import { ProductImage } from "@/components/product-image";
import { getProductRating } from "@/data/reviews";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const { avg, count } = getProductRating(product.id);

  return (
    <div className="group">
      {/* Image */}
      <Link href={`/shop/${product.id}`} className="block relative aspect-[3/4] bg-cream-dark rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4">
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/10 to-transparent z-10" />
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-mocha text-cream text-[9px] sm:text-[10px] font-accent uppercase tracking-[0.15em] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full">
            {product.badge}
          </span>
        )}
        {/* Wishlist */}
        <motion.button
          onClick={(e) => { e.preventDefault(); toggleItem(product.id); }}
          whileTap={{ scale: 0.85 }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <Heart size={15} fill={wishlisted ? "#e74c3c" : "none"} stroke={wishlisted ? "#e74c3c" : "currentColor"} strokeWidth={1.5} />
        </motion.button>
        {/* Add to cart */}
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white shadow-lg"
        >
          <ShoppingBag size={14} />
        </motion.button>
      </Link>

      {/* Info */}
      <Link href={`/shop/${product.id}`}>
        <h3 className="font-display text-sm sm:text-base font-semibold text-espresso group-hover:text-mocha transition-colors line-clamp-1">
          {product.name}
        </h3>
        {count > 0 && (
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10} fill={i < Math.round(avg) ? "#C4A882" : "none"} stroke="#C4A882" strokeWidth={1.5} />
            ))}
            <span className="text-[10px] text-espresso/40 font-accent ml-0.5">({count})</span>
          </div>
        )}
        <p className="text-xs sm:text-sm text-espresso/50 mt-1 line-clamp-1">
          {product.description}
        </p>
        <p className="font-accent text-sm sm:text-base font-semibold text-espresso mt-1.5">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </Link>
    </div>
  );
}
