"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ClientVideo } from "@/components/client-video";

export function VideoHeroBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [48, 0]);

  return (
    <section ref={ref} className="py-8 lg:py-12">
      <motion.div
        style={{ scale, opacity, borderRadius }}
        className="relative w-full h-[60vh] lg:h-[80vh] overflow-hidden"
      >
        <ClientVideo
          src="https://videos.pexels.com/video-files/2836376/2836376-hd_1920_1080_24fps.mp4"
          poster="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&h=1080&fit=crop&q=80"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-espresso/50" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-3xl px-6"
          >
            <p className="font-accent text-xs uppercase tracking-[0.4em] text-latte/80 mb-6">
              Watch the Craft
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-[0.95]">
              Every Bean
              <br />
              <span className="italic text-latte/80">Has a Story</span>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="h-[1px] bg-latte/50 mx-auto mt-8"
            />
          </motion.div>
        </div>

        {/* Corner brackets */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-cream/30" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-cream/30" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-cream/30" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-cream/30" />
      </motion.div>
    </section>
  );
}
