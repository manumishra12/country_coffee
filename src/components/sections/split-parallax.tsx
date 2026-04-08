"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function SplitParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[90vh] lg:h-screen overflow-hidden">
      {/* Full-bleed background image with parallax */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-125">
        <Image
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop&q=80"
          alt="Coffee shop ambience"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-espresso/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[2px] bg-latte mb-8"
            />
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.05]"
            >
              Life&apos;s Too Short
              <br />
              for <span className="italic text-latte">Bad Coffee</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-cream/60 text-lg max-w-md leading-relaxed"
            >
              Every cup should be an experience. We obsess over the details so
              you can simply enjoy the moment.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 mt-10 bg-cream text-espresso px-8 py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-latte transition-all duration-300 group"
              >
                Explore the Collection
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-cream/20 z-10" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-cream/20 z-10" />
    </section>
  );
}
