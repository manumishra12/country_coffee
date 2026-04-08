"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const images = [
  { src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&h=600&fit=crop&q=80", alt: "Coffee beans close-up" },
  { src: "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?w=900&h=600&fit=crop&q=80", alt: "Latte art being poured" },
  { src: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=900&h=600&fit=crop&q=80", alt: "Coffee farm landscape" },
];

export function ParallaxShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [3, -3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);

  return (
    <section ref={containerRef} className="py-32 lg:py-48 overflow-hidden bg-cream relative">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="0.5" fill="currentColor" className="text-espresso" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          style={{ scale }}
          className="text-center mb-20"
        >
          <p className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3">
            The Craft
          </p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-espresso">
            From Farm
            <br />
            <span className="text-mocha italic">to Cup</span>
          </h2>
        </motion.div>

        {/* Parallax Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <motion.div style={{ y: y1, rotate }} className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
            <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-accent text-xs uppercase tracking-[0.2em] text-cream/70 mb-1">Step 01</p>
              <p className="font-display text-xl font-semibold text-cream">Sourced</p>
              <p className="text-cream/60 text-sm mt-1">Hand-picked from highland farms at peak ripeness.</p>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl md:mt-16">
            <Image src={images[1].src} alt={images[1].alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-accent text-xs uppercase tracking-[0.2em] text-cream/70 mb-1">Step 02</p>
              <p className="font-display text-xl font-semibold text-cream">Roasted</p>
              <p className="text-cream/60 text-sm mt-1">Small-batch roasted to unlock complex flavour profiles.</p>
            </div>
          </motion.div>

          <motion.div style={{ y: y3, rotate: rotate2 }} className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
            <Image src={images[2].src} alt={images[2].alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-accent text-xs uppercase tracking-[0.2em] text-cream/70 mb-1">Step 03</p>
              <p className="font-display text-xl font-semibold text-cream">Delivered</p>
              <p className="text-cream/60 text-sm mt-1">Shipped within 48 hours of roasting, to your door.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
