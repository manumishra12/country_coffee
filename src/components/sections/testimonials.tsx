"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun M.",
    location: "Mumbai",
    text: "The Sunrise Blend is genuinely the best coffee I've had at home. The freshness is unmatched — you can tell it was roasted days ago, not months.",
    rating: 5,
  },
  {
    name: "Priya S.",
    location: "Bangalore",
    text: "Beautiful packaging, incredible taste. The Midnight Roast has this deep chocolate note that's perfect with milk. I've converted my whole office.",
    rating: 5,
  },
  {
    name: "Rahul K.",
    location: "Delhi",
    text: "Ordered the Pour Over Set and Countryside Medium together. The brewing guide they included was so helpful — I feel like a barista now.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-espresso text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-accent text-xs uppercase tracking-[0.3em] text-latte mb-3"
          >
            What People Say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            Loved by Coffee Purists
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-cream/5 backdrop-blur-sm rounded-2xl p-8 border border-cream/10"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    fill="currentColor"
                    className="text-latte"
                  />
                ))}
              </div>
              <p className="text-cream/70 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div>
                <p className="font-display font-semibold text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-cream/40 font-accent">
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
