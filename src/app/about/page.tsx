"use client";

import { motion } from "framer-motion";
import { Leaf, Mountain, Coffee, Heart, Globe, Sun } from "lucide-react";

const timeline = [
  { year: "2024", title: "The Beginning", description: "Country Coffee was founded with a simple mission — bring farm-fresh, small-batch roasted coffee to every home." },
  { year: "2024", title: "First Partnerships", description: "Established direct trade relationships with family farms in Ethiopia, Colombia, and Brazil." },
  { year: "2025", title: "The Collection", description: "Launched our full product line — beans, mugs, equipment, and merch. Every item crafted with intention." },
  { year: "2025", title: "Growing Community", description: "Built a community of coffee lovers who care about quality, sustainability, and the craft behind every cup." },
];

const values = [
  { icon: Mountain, title: "Traceability", description: "Every bag is traceable to the farm it came from. We believe in transparency at every step." },
  { icon: Heart, title: "Quality First", description: "We never compromise on quality. Small batches, fresh roasts, and rigorous quality control." },
  { icon: Leaf, title: "Sustainability", description: "Compostable packaging, carbon-neutral shipping, and fair wages for every farmer we work with." },
  { icon: Coffee, title: "Craft", description: "Coffee is an art. We approach every roast with the care and attention it deserves." },
  { icon: Globe, title: "Community", description: "We're building more than a brand — we're building a community of people who love great coffee." },
  { icon: Sun, title: "Freshness", description: "Roasted weekly, shipped within 48 hours. Your coffee is never more than days from the roaster." },
];

export default function AboutPage() {
  return (
    <section className="pt-32 pb-24 min-h-screen">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3"
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-espresso mb-6 sm:mb-8 max-w-4xl leading-tight"
        >
          A Legacy of Flavour,
          <br />
          <span className="text-mocha">Roasted With Purpose</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-espresso/60 max-w-2xl leading-relaxed"
        >
          Country Coffee was born from a love for the ritual of coffee — the quiet morning moments, the warmth of a fresh cup, and the stories behind every bean. We work directly with farmers, roast in small batches, and deliver coffee that&apos;s as honest as the land it comes from.
        </motion.p>
      </div>

      {/* Big image band */}
      <div className="w-full h-[30vh] sm:h-[40vh] lg:h-[50vh] bg-espresso mb-16 sm:mb-24 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-cream/10 text-center select-none"
          >
            Country
            <br />
            Coffee
          </motion.h2>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3"
        >
          What We Stand For
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold text-espresso mb-16"
        >
          Our Values
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 sm:p-6 md:p-8 rounded-2xl bg-white border border-espresso/5 hover:border-espresso/15 transition-colors"
            >
              <value.icon size={24} className="text-mocha mb-4" strokeWidth={1.5} />
              <h3 className="font-display text-xl font-semibold text-espresso mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-espresso/50 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3"
        >
          Our Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold text-espresso mb-16"
        >
          The Timeline
        </motion.h2>

        <div className="space-y-12">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-8 items-start"
            >
              <span className="font-accent text-sm text-mocha font-semibold w-16 flex-shrink-0 pt-1">
                {item.year}
              </span>
              <div className="border-l-2 border-espresso/10 pl-8 pb-4">
                <h3 className="font-display text-xl font-semibold text-espresso mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-espresso/50 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
