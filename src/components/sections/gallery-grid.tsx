"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=600&fit=crop&q=80", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=1200&fit=crop&q=80", span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=600&fit=crop&q=80", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&h=600&fit=crop&q=80", span: "col-span-2 row-span-1" },
  { src: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&h=600&fit=crop&q=80", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&h=600&fit=crop&q=80", span: "col-span-1 row-span-1" },
];

export function GalleryGrid() {
  return (
    <section className="py-24 lg:py-32 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-accent text-xs uppercase tracking-[0.3em] text-mocha mb-3">
            @countrycoffee
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso">
            The Coffee Life
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${img.span}`}
            >
              <Image
                src={img.src}
                alt="Coffee lifestyle"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-accent text-xs uppercase tracking-[0.2em] text-cream">View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
