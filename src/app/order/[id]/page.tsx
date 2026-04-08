"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Download, Package, MapPin, Truck, ArrowRight } from "lucide-react";
import { useCart, type Order } from "@/store/cart-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function OrderPage() {
  const { currentOrder } = useCart();
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!currentOrder) {
    return (
      <section className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Package size={48} className="mx-auto text-espresso/20 mb-6" strokeWidth={1} />
          <h1 className="font-display text-3xl font-bold text-espresso mb-4">No order found</h1>
          <p className="text-espresso/50 mb-8">Place an order first to see your order details.</p>
          <button onClick={() => router.push("/shop")} className="bg-espresso text-cream px-8 py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em]">
            Browse Shop
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-24 min-h-screen bg-cream-dark relative overflow-hidden">
      {/* Confetti animation */}
      {showConfetti && <Confetti />}

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Success header */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", bounce: 0.4 }} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
            className="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check size={36} className="text-white" strokeWidth={2.5} />
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-3">Order Confirmed!</h1>
          <p className="text-espresso/50 text-lg">Thank you for your purchase. Your coffee is on its way.</p>
          <p className="font-accent text-xs uppercase tracking-[0.2em] text-mocha mt-4">Order #{currentOrder.id}</p>
        </motion.div>

        {/* Action buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4 justify-center mb-12">
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-espresso text-cream px-6 py-3 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-mocha transition-colors">
            <Download size={16} /> Download Invoice
          </button>
          <Link href={`/tracking/${currentOrder.id}`} className="flex items-center gap-2 border border-espresso/20 text-espresso px-6 py-3 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-espresso hover:text-cream transition-colors">
            <MapPin size={16} /> Track Order
          </Link>
        </motion.div>

        {/* Invoice Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-3xl shadow-sm overflow-hidden print:shadow-none print:rounded-none" id="invoice">
          {/* Invoice Header */}
          <div className="bg-espresso text-cream p-8 print:bg-white print:text-espresso print:border-b-2 print:border-espresso">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Country Coffee" width={40} height={40} className="print:brightness-100 brightness-0 invert" />
                <div>
                  <h2 className="font-display text-xl font-bold">Country Coffee</h2>
                  <p className="text-cream/50 print:text-espresso/50 text-xs font-accent">Premium Artisan Coffee</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold">INVOICE</p>
                <p className="text-cream/50 print:text-espresso/50 text-xs font-accent mt-1">#{currentOrder.id}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Order & Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div>
                <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-espresso/40 mb-2">Order Date</p>
                <p className="text-sm text-espresso font-medium">
                  {new Date(currentOrder.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div>
                <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-espresso/40 mb-2">Ship To</p>
                <p className="text-sm text-espresso font-medium">{currentOrder.shipping.fullName}</p>
                <p className="text-xs text-espresso/50">{currentOrder.shipping.address}</p>
                <p className="text-xs text-espresso/50">{currentOrder.shipping.city}, {currentOrder.shipping.state} {currentOrder.shipping.zip}</p>
              </div>
              <div>
                <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-espresso/40 mb-2">Payment</p>
                <p className="text-sm text-espresso font-medium capitalize">{currentOrder.paymentMethod}</p>
                <p className="text-xs text-espresso/50">
                  Est. Delivery: {new Date(currentOrder.estimatedDelivery).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-espresso/10 rounded-2xl overflow-hidden mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-cream">
                    <th className="text-left px-5 py-3 font-accent text-[10px] uppercase tracking-[0.15em] text-espresso/40">Item</th>
                    <th className="text-center px-5 py-3 font-accent text-[10px] uppercase tracking-[0.15em] text-espresso/40">Qty</th>
                    <th className="text-right px-5 py-3 font-accent text-[10px] uppercase tracking-[0.15em] text-espresso/40">Price</th>
                    <th className="text-right px-5 py-3 font-accent text-[10px] uppercase tracking-[0.15em] text-espresso/40">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrder.items.map((item) => (
                    <tr key={item.id} className="border-t border-espresso/5">
                      <td className="px-5 py-4">
                        <p className="font-display text-sm font-semibold text-espresso">{item.name}</p>
                      </td>
                      <td className="text-center px-5 py-4 font-accent text-sm text-espresso/60">{item.quantity}</td>
                      <td className="text-right px-5 py-4 font-accent text-sm text-espresso/60">${item.price.toFixed(2)}</td>
                      <td className="text-right px-5 py-4 font-accent text-sm font-medium text-espresso">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-espresso/50 font-accent">Subtotal</span>
                  <span className="font-accent">${currentOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-espresso/50 font-accent">Shipping</span>
                  <span className="font-accent">{currentOrder.shippingCost === 0 ? "Free" : `$${currentOrder.shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-espresso/50 font-accent">Tax</span>
                  <span className="font-accent">${currentOrder.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-espresso/10 pt-3 flex justify-between">
                  <span className="font-display font-bold text-espresso text-lg">Total</span>
                  <span className="font-display font-bold text-espresso text-lg">${currentOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-10 pt-6 border-t border-espresso/10 text-center">
              <p className="text-xs text-espresso/30 font-accent">
                Thank you for choosing Country Coffee. For support, contact hello@countrycoffee.com
              </p>
            </div>
          </div>
        </motion.div>

        {/* Track order CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8 text-center">
          <Link
            href={`/tracking/${currentOrder.id}`}
            className="inline-flex items-center gap-2 font-accent text-sm text-mocha hover:text-espresso uppercase tracking-[0.15em] transition-colors group"
          >
            <Truck size={16} /> Track your delivery in real time
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 print:hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: -20,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 20 : 1000,
            rotate: Math.random() * 720 - 360,
            opacity: 0,
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            delay: Math.random() * 1.5,
            ease: "easeOut",
          }}
          className="absolute w-2 h-3 rounded-sm"
          style={{
            backgroundColor: ["#6B4226", "#C4A882", "#8B9A7B", "#2C1810", "#D4C4A8"][Math.floor(Math.random() * 5)],
          }}
        />
      ))}
    </div>
  );
}
