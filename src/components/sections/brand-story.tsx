"use client";

import { motion } from "framer-motion";
import { Leaf, Mountain, Coffee } from "lucide-react";

const values = [
  {
    icon: Mountain,
    title: "Single Origin",
    description:
      "Sourced directly from family-owned farms in Ethiopia, Colombia, and Brazil. Every bag is fully traceable.",
  },
  {
    icon: Coffee,
    title: "Small Batch",
    description:
      "Roasted in micro-lots of 25kg to ensure peak freshness. We roast weekly and ship within 48 hours.",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description:
      "Fair trade partnerships, compostable packaging, and carbon-neutral shipping. Coffee that cares.",
  },
];

export function BrandStory() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3"
            >
              Our Philosophy
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight"
            >
              A Legacy of
              <br />
              Flavour & Craft
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-espresso/60 leading-relaxed max-w-lg"
            >
              Country Coffee was born from a simple belief: great coffee
              shouldn&apos;t be complicated. We work with farmers who share our
              passion, roast with intention, and deliver an experience that
              speaks for itself. Every cup tells a story — from the soil it grew
              in, to the hands that picked it, to your morning ritual.
            </motion.p>
          </div>

          {/* Values */}
          <div className="space-y-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-5 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-espresso/5 flex items-center justify-center flex-shrink-0 group-hover:bg-mocha/10 transition-colors">
                  <value.icon
                    size={22}
                    className="text-mocha"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-espresso mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-espresso/50 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
