"use client";

import { motion } from "framer-motion";

const words = [
  "Single Origin",
  "•",
  "Small Batch",
  "•",
  "Hand Roasted",
  "•",
  "Farm to Cup",
  "•",
  "Sustainable",
  "•",
  "Artisan Craft",
  "•",
  "Premium Quality",
  "•",
  "Fresh Daily",
  "•",
];

export function MarqueeBanner() {
  return (
    <section className="py-6 bg-espresso overflow-hidden border-y border-cream/5">
      <div className="flex">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            animate={{ x: "-100%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex flex-shrink-0 gap-8 items-center"
          >
            {words.map((word, j) => (
              <span
                key={`${i}-${j}`}
                className={`flex-shrink-0 whitespace-nowrap ${
                  word === "•"
                    ? "text-latte/40 text-lg"
                    : "font-display text-xl md:text-2xl font-semibold text-cream/60 tracking-wide"
                }`}
              >
                {word}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
