"use client";

import { motion } from "framer-motion";
import { SketchCoffeeCup, SketchCoffeeBean, SketchPourOver, SketchLeafBranch } from "@/components/svg/coffee-sketches";

export function SketchSection() {
  return (
    <section className="py-24 lg:py-32 bg-cream relative overflow-hidden">
      {/* Scattered floating sketch elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-20 left-[5%]"
        >
          <SketchCoffeeBean className="w-16 h-16 text-mocha/10" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-[8%]"
        >
          <SketchCoffeeBean className="w-12 h-12 text-mocha/8" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-[15%]"
        >
          <SketchCoffeeBean className="w-10 h-10 text-mocha/6" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-20 right-[12%]"
        >
          <SketchCoffeeBean className="w-14 h-14 text-mocha/7" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header with leaf divider */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3"
          >
            Artisan Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-espresso mb-8"
          >
            Crafted With
            <br />
            <span className="italic text-mocha">Intention</span>
          </motion.h2>
          <SketchLeafBranch className="w-64 md:w-96 mx-auto text-mocha/25" />
        </div>

        {/* Sketch illustrations grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <SketchCoffeeCup className="w-40 h-40 mx-auto text-mocha/30 mb-6" />
            <h3 className="font-display text-2xl font-semibold text-espresso mb-3">
              The Perfect Cup
            </h3>
            <p className="text-espresso/50 text-sm leading-relaxed max-w-xs mx-auto">
              Every cup is brewed with precision — the right temperature, the right grind,
              the right ratio. Nothing left to chance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-center"
          >
            <SketchCoffeeBean className="w-40 h-40 mx-auto text-mocha/30 mb-6" />
            <h3 className="font-display text-2xl font-semibold text-espresso mb-3">
              The Finest Beans
            </h3>
            <p className="text-espresso/50 text-sm leading-relaxed max-w-xs mx-auto">
              Hand-selected from highland farms. We visit every origin, taste every harvest,
              and choose only the exceptional.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <SketchPourOver className="w-40 h-40 mx-auto text-mocha/30 mb-6" />
            <h3 className="font-display text-2xl font-semibold text-espresso mb-3">
              The Ritual
            </h3>
            <p className="text-espresso/50 text-sm leading-relaxed max-w-xs mx-auto">
              From pour-over to espresso, we celebrate the ritual of coffee. Slow down.
              Savour the process.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
