"use client";

import { motion } from "framer-motion";
import { Repeat, Truck, Percent, Coffee } from "lucide-react";
import Link from "next/link";

const perks = [
  { icon: Percent, label: "15% Off", desc: "Every delivery" },
  { icon: Truck, label: "Free Ship", desc: "Always free" },
  { icon: Repeat, label: "Flexible", desc: "Skip or cancel" },
  { icon: Coffee, label: "Fresh", desc: "Roasted to order" },
];

export function SubscriptionCTA() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-espresso via-espresso-light to-espresso overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-cream/5" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full border border-cream/5" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-accent text-xs uppercase tracking-[0.4em] text-latte/60 mb-4"
          >
            Never Run Out
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream mb-5 leading-tight"
          >
            Subscribe &<br className="sm:hidden" /> Save 15%
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cream/50 text-base sm:text-lg max-w-lg mx-auto mb-10"
          >
            Fresh coffee, delivered on your schedule. Choose weekly, bi-weekly, or monthly.
            Pause or cancel anytime.
          </motion.p>

          {/* Perks grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10 max-w-2xl mx-auto"
          >
            {perks.map((perk, i) => (
              <div key={i} className="bg-cream/5 border border-cream/10 rounded-2xl p-4 text-center">
                <perk.icon size={20} className="text-latte mx-auto mb-2" strokeWidth={1.5} />
                <p className="font-display text-sm font-semibold text-cream">{perk.label}</p>
                <p className="text-[10px] text-cream/40 font-accent">{perk.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-cream text-espresso px-8 py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-latte transition-all duration-300 group"
            >
              Start Your Subscription
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
