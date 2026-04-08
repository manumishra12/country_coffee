"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ClientVideo } from "@/components/client-video";

const coffeeImages = [
  {
    src: "https://images.unsplash.com/photo-1504627298321-86df79e41527?w=800&h=500&fit=crop&q=80",
    alt: "Barista pouring latte art",
    caption: "Crafted with precision",
  },
  {
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=500&fit=crop&q=80",
    alt: "Coffee shop interior",
    caption: "Where stories begin",
  },
  {
    src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=500&fit=crop&q=80",
    alt: "Coffee beans roasting",
    caption: "Roasted to perfection",
  },
];

export function CoffeeVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3"
        >
          Behind the Scenes
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold text-espresso"
        >
          The Art of Coffee Making
        </motion.h2>
      </div>

      {/* Horizontal scrolling image strip */}
      <motion.div style={{ x }} className="flex gap-6 pl-6 lg:pl-8">
        {/* Video card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative flex-shrink-0 w-[500px] lg:w-[700px] h-[350px] lg:h-[450px] rounded-3xl overflow-hidden group"
        >
          <ClientVideo
            src="https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_24fps.mp4"
            poster="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=800&fit=crop&q=80"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <p className="font-accent text-xs uppercase tracking-[0.2em] text-cream/70 mb-1">Video</p>
            <p className="font-display text-xl font-semibold text-cream">The Brewing Process</p>
          </div>
          {/* Play indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-cream/20 backdrop-blur-sm flex items-center justify-center border border-cream/30 group-hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-l-[12px] border-l-cream border-y-[8px] border-y-transparent ml-1" />
            </div>
          </div>
        </motion.div>

        {/* Image cards */}
        {coffeeImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i + 1) * 0.1 }}
            className="relative flex-shrink-0 w-[400px] lg:w-[500px] h-[350px] lg:h-[450px] rounded-3xl overflow-hidden group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display text-lg font-semibold text-cream">
                {img.caption}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Extra padding element */}
        <div className="flex-shrink-0 w-16" />
      </motion.div>
    </section>
  );
}
