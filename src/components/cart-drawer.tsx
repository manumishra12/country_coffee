"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart-context";
import { ProductImage } from "@/components/product-image";
import { useRouter } from "next/navigation";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-espresso/10">
              <h2 className="font-display text-xl font-semibold">Your Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-espresso/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-espresso/40 gap-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-accent text-sm uppercase tracking-widest">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4"
                    >
                      <div className="w-20 h-20 bg-cream rounded-lg overflow-hidden flex-shrink-0 relative">
                        <ProductImage
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-sm font-semibold truncate">
                          {item.name}
                        </h3>
                        {item.variant && (
                          <p className="text-xs text-espresso/50 mt-0.5">
                            {item.variant}
                          </p>
                        )}
                        <p className="font-accent text-sm font-medium mt-1">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-9 h-9 rounded-full border border-espresso/20 flex items-center justify-center hover:bg-espresso/5 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-accent text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-9 h-9 rounded-full border border-espresso/20 flex items-center justify-center hover:bg-espresso/5 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-xs text-espresso/40 hover:text-red-500 transition-colors uppercase tracking-wider font-accent"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-4 sm:px-6 py-5 border-t border-espresso/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-accent text-sm uppercase tracking-wider text-espresso/60">
                    Subtotal
                  </span>
                  <span className="font-display text-xl font-semibold">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <button
                  onClick={() => { onClose(); router.push("/checkout"); }}
                  className="w-full bg-espresso text-cream py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-espresso-light transition-colors"
                >
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-espresso/40 hover:text-espresso/70 font-accent uppercase tracking-wider transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
