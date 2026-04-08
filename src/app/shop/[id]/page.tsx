"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ProductImage } from "@/components/product-image";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Check, Heart, Star, Share2 } from "lucide-react";
import { products } from "@/data/products";
import { getProductReviews, getProductRating } from "@/data/reviews";
import { useCart } from "@/store/cart-context";
import { useWishlist } from "@/store/wishlist-context";
import { useRecentlyViewed } from "@/store/recently-viewed";
import { ProductCard } from "@/components/product-card";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { addItem: addViewed, items: viewedIds } = useRecentlyViewed();

  useEffect(() => {
    if (product) addViewed(product.id);
  }, [product, addViewed]);

  if (!product) return notFound();

  const wishlisted = isWishlisted(product.id);
  const productReviews = getProductReviews(product.id);
  const { avg, count: reviewCount } = getProductRating(product.id);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const recentlyViewed = viewedIds.filter((vid) => vid !== product.id).map((vid) => products.find((p) => p.id === vid)).filter(Boolean).slice(0, 4);

  return (
    <section className="pt-24 sm:pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 sm:mb-10">
          <Link href="/shop" className="inline-flex items-center gap-2 font-accent text-xs uppercase tracking-[0.15em] text-espresso/50 hover:text-espresso transition-colors">
            <ArrowLeft size={14} /> Back to Shop
          </Link>
        </motion.div>

        {/* Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative aspect-square bg-cream-dark rounded-2xl sm:rounded-3xl overflow-hidden">
            <ProductImage src={product.image} alt={product.name} category={product.category} priority />
            {product.badge && (
              <span className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-mocha text-cream text-[10px] sm:text-xs font-accent uppercase tracking-[0.15em] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">{product.badge}</span>
            )}
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col justify-center">
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-2">{product.category}</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso mb-3">{product.name}</h1>

            {/* Rating */}
            {reviewCount > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.round(avg) ? "#C4A882" : "none"} stroke="#C4A882" strokeWidth={1.5} />
                  ))}
                </div>
                <span className="text-xs text-espresso/50 font-accent">{avg} ({reviewCount} reviews)</span>
              </div>
            )}

            <p className="text-espresso/60 leading-relaxed mb-6 max-w-lg text-sm sm:text-base">{product.description}</p>

            {/* Meta pills */}
            {(product.origin || product.roast || product.weight) && (
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                {product.origin && (
                  <div className="px-3 py-1.5 bg-cream rounded-full">
                    <span className="font-accent text-[10px] sm:text-xs text-espresso/50 uppercase tracking-wider">Origin: </span>
                    <span className="font-accent text-[10px] sm:text-xs font-medium text-espresso">{product.origin}</span>
                  </div>
                )}
                {product.roast && (
                  <div className="px-3 py-1.5 bg-cream rounded-full">
                    <span className="font-accent text-[10px] sm:text-xs text-espresso/50 uppercase tracking-wider">Roast: </span>
                    <span className="font-accent text-[10px] sm:text-xs font-medium text-espresso capitalize">{product.roast}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="px-3 py-1.5 bg-cream rounded-full">
                    <span className="font-accent text-[10px] sm:text-xs text-espresso/50 uppercase tracking-wider">Weight: </span>
                    <span className="font-accent text-[10px] sm:text-xs font-medium text-espresso">{product.weight}</span>
                  </div>
                )}
              </div>
            )}

            {/* Details list */}
            {product.details && (
              <ul className="space-y-2 mb-6">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-3 text-sm text-espresso/60">
                    <Check size={14} className="text-sage shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            )}

            {/* Price + Qty + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <span className="font-display text-3xl font-bold text-espresso">${product.price.toFixed(2)}</span>
              <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
                {/* Quantity */}
                <div className="flex items-center border border-espresso/15 rounded-full">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-espresso/50 hover:text-espresso">−</button>
                  <span className="w-8 text-center font-accent text-sm">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-espresso/50 hover:text-espresso">+</button>
                </div>
                <motion.button onClick={handleAdd} whileTap={{ scale: 0.97 }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-accent text-sm uppercase tracking-[0.15em] transition-all ${added ? "bg-sage text-white" : "bg-espresso text-cream hover:bg-mocha"}`}
                >
                  {added ? <><Check size={16} /> Added!</> : <><ShoppingBag size={16} /> Add to Cart</>}
                </motion.button>
              </div>
            </div>

            {/* Wishlist + Share */}
            <div className="flex gap-3 mt-4">
              <button onClick={() => toggleItem(product.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-accent transition-all ${wishlisted ? "bg-red-50 text-red-500" : "border border-espresso/15 text-espresso/50 hover:border-espresso/30"}`}>
                <Heart size={14} fill={wishlisted ? "currentColor" : "none"} /> {wishlisted ? "Saved" : "Save"}
              </button>
              <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="flex items-center gap-2 px-4 py-2 rounded-full border border-espresso/15 text-espresso/50 hover:border-espresso/30 text-xs font-accent transition-colors">
                <Share2 size={14} /> Share
              </button>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        {productReviews.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <h2 className="font-display text-2xl font-bold text-espresso mb-8">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productReviews.map((review) => (
                <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-cream rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} fill={i < review.rating ? "#C4A882" : "none"} stroke="#C4A882" strokeWidth={1.5} />
                      ))}
                    </div>
                    {review.verified && <span className="text-[9px] bg-sage/20 text-sage px-2 py-0.5 rounded-full font-accent uppercase">Verified</span>}
                  </div>
                  <p className="font-display text-sm font-semibold text-espresso mb-1">{review.title}</p>
                  <p className="text-sm text-espresso/50 leading-relaxed mb-3">{review.body}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-espresso/40 font-accent">{review.author}</p>
                    <p className="text-[10px] text-espresso/30 font-accent">{new Date(review.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <h2 className="font-display text-2xl font-bold text-espresso mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <h2 className="font-display text-2xl font-bold text-espresso mb-8">Recently Viewed</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewed.map((p) => p && <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
