"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed GIF background — center the character on mobile */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://miro.medium.com/1*Ne5nPK5gH1Z_a8QejwV1KA.gif"
          alt="Coffee making process"
          fill
          className="object-cover object-[70%_center] md:object-right"
          unoptimized
          priority
        />
        {/* Overlay — heavier on mobile so text is readable over centered character */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/75 to-espresso/50 md:from-espresso/85 md:via-espresso/60 md:to-espresso/30" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-espresso/20" />
        {/* Subtle grain */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />
      </div>

      {/* Content — always left-aligned */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 lg:pt-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-latte mb-6 sm:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-accent text-[10px] sm:text-xs uppercase tracking-[0.4em] text-latte/80 mb-4 sm:mb-6"
          >
            Est. 2024 &mdash; Artisan Roasters
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-[2.5rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-cream"
          >
            Fuel Your
            <br />
            Day With
            <br />
            <span className="text-latte italic">Timeless</span>
            <br />
            Coffee
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-5 sm:mt-8 text-sm sm:text-lg text-cream/60 max-w-md leading-relaxed"
          >
            Hand-roasted in small batches, sourced from the world&apos;s finest
            farms. Experience coffee the way it was meant to be.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-7 sm:mt-10 flex flex-wrap gap-3 sm:gap-4"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 bg-cream text-espresso px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-accent text-xs sm:text-sm uppercase tracking-[0.15em] hover:bg-latte transition-all duration-300"
            >
              Shop Now
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 border border-cream/30 text-cream px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-accent text-xs sm:text-sm uppercase tracking-[0.15em] hover:bg-cream hover:text-espresso transition-all duration-300"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-24 right-6 lg:right-12 w-16 h-16 border-t border-r border-cream/15 z-10 hidden lg:block" />
      <div className="absolute bottom-12 left-6 lg:left-12 w-16 h-16 border-b border-l border-cream/15 z-10 hidden sm:block" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-cream/30 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-cream/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
